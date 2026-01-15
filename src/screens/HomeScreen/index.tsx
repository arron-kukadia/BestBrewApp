import React, { useMemo } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
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
import { createStyles } from './styles'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>
type TabNavigationProp = BottomTabNavigationProp<MainTabParamList>

export const HomeScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()
  const tabNavigation = useNavigation<TabNavigationProp>()
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [], isLoading } = useCoffees(user?.id)

  const userName = user?.name || user?.email?.split('@')[0] || 'Coffee Lover'
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

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
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
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
                      meta={formatDate(coffee.createdAt)}
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
