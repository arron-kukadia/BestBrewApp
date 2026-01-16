import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useDiscoveryData } from '@/hooks/useDiscoveryData'
import { SectionHeader } from '@/components/common/SectionHeader'
import { RecommendationCard } from '@/components/common/RecommendationCard'
import { EmptyState } from '@/components/common/EmptyState'
import { TopBrandsChart } from '@/components/Discovery/TopBrandsChart'
import { FlavourProfileChart } from '@/components/Discovery/FlavourProfileChart'
import { createStyles } from './styles'

export const DiscoveryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const { topBrands, flavourProfile, recommendations, hasEntries } = useDiscoveryData(
    coffees,
    theme.colors.primary
  )

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Find your perfect coffee</Text>
    </View>
  )

  if (!hasEntries) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {renderHeader()}
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
        {renderHeader()}

        {recommendations.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Recommended for You" />
            <View style={styles.recommendationsContainer}>
              {recommendations.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  title={rec.title}
                  subtitle={rec.subtitle}
                  reason={rec.reason}
                  matchScore={rec.matchScore}
                />
              ))}
            </View>
          </View>
        )}

        <TopBrandsChart data={topBrands} />
        <FlavourProfileChart data={flavourProfile} />
      </ScrollView>
    </SafeAreaView>
  )
}
