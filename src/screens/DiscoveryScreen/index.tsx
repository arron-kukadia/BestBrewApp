import React from 'react'
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useInsights } from '@/api/useInsights'
import { useDiscoveryData } from '@/hooks/useDiscoveryData'
import { SectionHeader } from '@/components/common/SectionHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { TopBrandsChart } from '@/components/Discovery/TopBrandsChart'
import { FlavourProfileChart } from '@/components/Discovery/FlavourProfileChart'
import { Insight } from '@/types/insight'
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Find your perfect coffee</Text>
    </View>
  )

  const renderInsights = () => {
    if (coffees.length < 2) return null

    if (insightsLoading) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Your Coffee Insights" />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Analyzing your taste profile...</Text>
          </View>
        </View>
      )
    }

    if (insightsError) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Your Coffee Insights" />
          <Pressable style={styles.errorContainer} onPress={() => refetchInsights()}>
            <MaterialIcons name="refresh" size={24} color={theme.colors.primary} />
            <Text style={styles.errorText}>Tap to retry</Text>
          </Pressable>
        </View>
      )
    }

    if (!insightsData) return null

    return (
      <>
        {insightsData.tasteProfile && (
          <View style={styles.section}>
            <SectionHeader title="Your Taste Profile" />
            <View style={styles.profileCard}>
              <MaterialIcons name="person" size={24} color={theme.colors.primary} />
              <Text style={styles.profileText}>{insightsData.tasteProfile}</Text>
            </View>
          </View>
        )}

        {insightsData.insights.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Insights" />
            <View style={styles.insightsContainer}>
              {insightsData.insights.map((insight: Insight) => (
                <View key={insight.id} style={styles.insightCard}>
                  <MaterialIcons
                    name={insight.icon as keyof typeof MaterialIcons.glyphMap}
                    size={24}
                    color={theme.colors.primary}
                  />
                  <View style={styles.insightContent}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text style={styles.insightDescription}>{insight.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </>
    )
  }

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
        {renderInsights()}
        <TopBrandsChart data={topBrands} />
        <FlavourProfileChart data={flavourProfile} />
      </ScrollView>
    </SafeAreaView>
  )
}
