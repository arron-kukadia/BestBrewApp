import React, { useEffect } from 'react'
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useRecommendations } from '@/api/useRecommendations'
import { useDiscoveryData } from '@/hooks/useDiscoveryData'
import { useLocation } from '@/hooks/useLocation'
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
  const { topBrands, flavourProfile, hasEntries } = useDiscoveryData(coffees, theme.colors.primary)

  const {
    country,
    countryCode,
    city,
    hasPermission,
    isLoading: locationLoading,
    requestPermission,
  } = useLocation()

  const locationInfo = hasPermission ? { country, countryCode, city } : null

  const {
    data: aiRecommendations = [],
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refetch: refetchRecommendations,
  } = useRecommendations({
    userId: user?.id,
    coffees,
    location: locationInfo,
    enabled: hasEntries && coffees.length >= 2,
  })

  useEffect(() => {
    if (hasEntries && !hasPermission && !locationLoading) {
      requestPermission()
    }
  }, [hasEntries, hasPermission, locationLoading, requestPermission])

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Find your perfect coffee</Text>
    </View>
  )

  const renderLocationBanner = () => {
    if (hasPermission || !hasEntries) return null

    return (
      <Pressable style={styles.locationBanner} onPress={requestPermission}>
        <MaterialIcons name="location-on" size={20} color={theme.colors.primary} />
        <Text style={styles.locationBannerText}>Enable location for better recommendations</Text>
        <MaterialIcons name="chevron-right" size={20} color={theme.colors.textSecondary} />
      </Pressable>
    )
  }

  const renderRecommendations = () => {
    if (coffees.length < 2) return null

    if (recommendationsLoading) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Recommended for You" />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Finding perfect coffees for you...</Text>
          </View>
        </View>
      )
    }

    if (recommendationsError) {
      return (
        <View style={styles.section}>
          <SectionHeader title="Recommended for You" />
          <Pressable style={styles.errorContainer} onPress={() => refetchRecommendations()}>
            <MaterialIcons name="refresh" size={24} color={theme.colors.primary} />
            <Text style={styles.errorText}>Tap to retry</Text>
          </Pressable>
        </View>
      )
    }

    if (aiRecommendations.length === 0) return null

    return (
      <View style={styles.section}>
        <SectionHeader title="Recommended for You" />
        <View style={styles.recommendationsContainer}>
          {aiRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              title={rec.coffeeName}
              subtitle={rec.brand}
              reason={rec.reason}
              matchScore={rec.matchScore}
              imageUrl={rec.imageUrl}
              purchaseUrl={rec.purchaseUrl}
              purchaseSource={rec.purchaseSource}
              priceRange={rec.priceRange}
            />
          ))}
        </View>
      </View>
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
        {renderLocationBanner()}
        {renderRecommendations()}
        <TopBrandsChart data={topBrands} />
        <FlavourProfileChart data={flavourProfile} />
      </ScrollView>
    </SafeAreaView>
  )
}
