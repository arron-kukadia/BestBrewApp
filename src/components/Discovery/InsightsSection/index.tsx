import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { SectionHeader } from '@/components/common/SectionHeader'
import { InsightsResponse, Insight } from '@/types/insight'
import { createStyles } from './styles'

interface InsightsSectionProps {
  data: InsightsResponse | undefined
  error: Error | null
  onRetry: () => void
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ data, error, onRetry }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

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
      {data.insights.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Recommendations" />
          <View style={styles.insightsContainer}>
            {data.insights.map((insight: Insight, index: number) => (
              <Animated.View key={insight.id} entering={FadeInUp.duration(400).delay(index * 100)}>
                <View style={styles.insightCard}>
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
              </Animated.View>
            ))}
          </View>
        </View>
      )}
    </>
  )
}
