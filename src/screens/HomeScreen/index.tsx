import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { RootStackParamList } from '@/types'
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

export const HomeScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()
  const user = useAuthStore((state) => state.user)

  const userName = user?.name || user?.email?.split('@')[0] || 'Coffee Lover'
  const hasEntries = false

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
          <StatCard icon="coffee" label="Coffees Curated" value={0} />
          <StatCard icon="star" label="Avg Rating" value="-" color={theme.colors.rating} />
        </View>

        <View style={styles.section}>
          {hasEntries ? (
            <>
              <SectionHeader
                title="Recent Activity"
                actionText="See all"
                onActionPress={() => {}}
              />
              <View style={styles.activityList}>
                <ActivityCard
                  icon="coffee"
                  title="Ethiopian Yirgacheffe"
                  subtitle="Light roast • Pour over"
                  meta="Today"
                  onPress={() => {}}
                />
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
