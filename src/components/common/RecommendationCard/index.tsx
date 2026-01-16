import React from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface RecommendationCardProps {
  title: string
  subtitle: string
  reason: string
  matchScore?: number
  onPress?: () => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  subtitle,
  reason,
  matchScore,
  onPress,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const content = (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="auto-awesome" size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        {matchScore !== undefined && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{matchScore}%</Text>
          </View>
        )}
      </View>
      <Text style={styles.reason} numberOfLines={2}>
        {reason}
      </Text>
      {onPress && (
        <View style={styles.footer}>
          <Text style={styles.ctaText}>View Details</Text>
          <MaterialIcons name="chevron-right" size={16} color={theme.colors.primary} />
        </View>
      )}
    </View>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: Platform.OS === 'ios' ? 0.7 : 1 }]}
      >
        {content}
      </Pressable>
    )
  }

  return content
}
