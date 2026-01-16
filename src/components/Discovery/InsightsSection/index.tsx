import React from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { SectionHeader } from '@/components/common/SectionHeader'
import { InsightsResponse, Insight } from '@/types/insight'
import { createStyles } from './styles'

interface InsightsSectionProps {
  data: InsightsResponse | undefined
  isLoading: boolean
  error: Error | null
  onRetry: () => void
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  data,
  isLoading,
  error,
  onRetry,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (isLoading) {
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

  if (error) {
    return (
      <View style={styles.section}>
        <SectionHeader title="Your Coffee Insights" />
        <Pressable style={styles.errorContainer} onPress={onRetry}>
          <MaterialIcons name="refresh" size={24} color={theme.colors.primary} />
          <Text style={styles.errorText}>Tap to retry</Text>
        </Pressable>
      </View>
    )
  }

  if (!data) return null

  return (
    <>
      {data.tasteProfile && (
        <View style={styles.section}>
          <SectionHeader title="Your Taste Profile" />
          <View style={styles.profileCard}>
            <MaterialIcons name="person" size={24} color={theme.colors.primary} />
            <Text style={styles.profileText}>{data.tasteProfile}</Text>
          </View>
        </View>
      )}

      {data.insights.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Insights" />
          <View style={styles.insightsContainer}>
            {data.insights.map((insight: Insight) => (
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
