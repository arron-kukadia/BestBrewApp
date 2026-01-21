import React from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useInsights } from '@/api/useInsights'
import { useDiscoveryData } from '@/hooks/useDiscoveryData'
import { EmptyState } from '@/components/common/EmptyState'
import { DiscoveryHeader } from '@/components/Discovery/DiscoveryHeader'
import { InsightsSection } from '@/components/Discovery/InsightsSection'
import { TopBrandsChart } from '@/components/Discovery/TopBrandsChart'
import { FlavourProfileChart } from '@/components/Discovery/FlavourProfileChart'
import { createStyles } from './styles'
import LottieView from 'lottie-react-native'

export const DiscoveryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const { topBrands, flavourProfile, hasEntries } = useDiscoveryData(coffees, theme.colors.primary)

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
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('@/assets/animations/loading.json')}
            style={styles.loadingAnimation}
            autoPlay
          />
          <Text style={styles.loadingText}>Analyzing your taste profile...</Text>
        </View>
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
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>{hintMessage}</Text>
          </View>
        )}
        <FlavourProfileChart data={flavourProfile} tasteProfile={insightsData?.tasteProfile} />
        {!needsMoreCoffees && (
          <InsightsSection data={insightsData} error={insightsError} onRetry={refetchInsights} />
        )}
        <TopBrandsChart data={topBrands} />
      </ScrollView>
    </SafeAreaView>
  )
}
