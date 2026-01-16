import React from 'react'
import { View, ScrollView } from 'react-native'
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DiscoveryHeader />
        {coffees.length >= 2 && (
          <InsightsSection
            data={insightsData}
            isLoading={insightsLoading}
            error={insightsError}
            onRetry={refetchInsights}
          />
        )}
        <TopBrandsChart data={topBrands} />
        <FlavourProfileChart data={flavourProfile} />
      </ScrollView>
    </SafeAreaView>
  )
}
