import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { useAnimationConfig } from '@/hooks/useAnimationConfig'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useInsights } from '@/api/useInsights'
import { useDiscoveryData } from '@/hooks/useDiscoveryData'
import { EmptyState } from '@/components/common/EmptyState'
import { Loader } from '@/components/common/Loader'
import { DiscoveryHeader } from '@/components/Discovery/DiscoveryHeader'
import { InsightsSection } from '@/components/Discovery/InsightsSection'
import { FlavourProfileChart } from '@/components/Discovery/FlavourProfileChart'
import { createStyles } from './styles'

export const DiscoveryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { entering } = useAnimationConfig()
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const { flavourProfile, hasEntries } = useDiscoveryData(coffees)

  const {
    data: insightsData,
    isLoading: insightsLoading,
    error: insightsError,
    refetch: refetchInsights,
  } = useInsights({
    userId: user?.id,
    coffees,
    enabled: hasEntries && coffees.length >= 2,
  })

  const needsMoreCoffees = coffees.length < 2
  const needsTasteNotes = flavourProfile.data.length < 3

  const getHintMessage = () => {
    if (needsMoreCoffees && needsTasteNotes) {
      return 'Add at least 2 coffees with flavour notes to unlock AI insights and your taste profile chart.'
    }
    if (needsMoreCoffees) {
      return 'Add at least 2 coffees to unlock AI insights about your preferences.'
    }
    if (needsTasteNotes) {
      return 'Log flavour notes on your coffees to see your taste profile chart.'
    }
    return null
  }

  const hintMessage = getHintMessage()

  if (!hasEntries) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <DiscoveryHeader />
        <View style={styles.emptyContainer}>
          <EmptyState
            icon="explore"
            title="Start your coffee journey"
            description="Add some coffees to unlock personalized recommendations and insights about your taste preferences."
          />
        </View>
      </SafeAreaView>
    )
  }

  if (insightsLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Loader text="Analyzing your taste profile..." />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DiscoveryHeader />
        {hintMessage && (
          <Animated.View entering={entering(400)} style={styles.hintContainer}>
            <Text style={styles.hintText}>{hintMessage}</Text>
          </Animated.View>
        )}
        <Animated.View entering={entering(400, 100)}>
          <FlavourProfileChart data={flavourProfile} tasteProfile={insightsData?.tasteProfile} />
        </Animated.View>
        {!needsMoreCoffees && (
          <InsightsSection data={insightsData} error={insightsError} onRetry={refetchInsights} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
