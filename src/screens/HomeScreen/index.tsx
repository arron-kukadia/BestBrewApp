import React, { useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { RootStackParamList, MainTabParamList } from '@/types'
import { SectionHeader } from '@/components/common/SectionHeader'
import { StatCard } from '@/components/common/StatCard'
import { ActivityCard } from '@/components/common/ActivityCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Loader } from '@/components/common/Loader'
import { getGreeting, formatRelativeDate } from '@/helpers/date'
import { createStyles } from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>
type TabNavigationProp = BottomTabNavigationProp<MainTabParamList>

export const HomeScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()
  const tabNavigation = useNavigation<TabNavigationProp>()
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [], isLoading } = useCoffees(user?.id)

  const fullName = user?.name || user?.email?.split('@')[0] || 'Coffee Lover'
  const userName = fullName.split(' ')[0]
  const hasEntries = coffees.length > 0

  const stats = useMemo(() => {
    if (coffees.length === 0) return { total: 0, avgRating: '-' }
    const total = coffees.length
    const avgRating = (coffees.reduce((sum, c) => sum + c.rating, 0) / total).toFixed(1)
    return { total, avgRating }
  }, [coffees])

  const recentCoffees = useMemo(() => {
    return [...coffees]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
  }, [coffees])

  const handleAddCoffee = () => {
    navigation.navigate('AddEntry')
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard icon="coffee" label="Coffees Curated" value={stats.total} />
          <StatCard
            icon="star"
            label="Avg Rating"
            value={stats.avgRating}
            color={theme.colors.rating}
          />
        </View>

        <View style={styles.section}>
          {isLoading ? (
            <Loader size="small" />
          ) : hasEntries ? (
            <>
              <SectionHeader
                title="Recent Activity"
                actionText="See all"
                onActionPress={() => tabNavigation.navigate('History')}
              />
              <View style={styles.activityList}>
                {recentCoffees.map((coffee, index) => (
                  <Animated.View
                    key={coffee.id}
                    entering={FadeInUp.duration(400).delay(index * 100)}
                  >
                    <ActivityCard
                      icon="coffee"
                      title={coffee.name}
                      subtitle={coffee.brand}
                      rating={coffee.rating}
                      meta={formatRelativeDate(coffee.createdAt)}
                      imageUri={coffee.imageUrl}
                      onPress={() => navigation.navigate('CoffeeDetail', { coffeeId: coffee.id })}
                    />
                  </Animated.View>
                ))}
              </View>
            </>
          ) : (
            <EmptyState
              icon="coffee"
              title="No coffees explored yet"
              description="Start tracking your coffee journey and receive personalized recommendations by adding your first entry"
              actionLabel="Start Your Journey"
              onAction={handleAddCoffee}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
