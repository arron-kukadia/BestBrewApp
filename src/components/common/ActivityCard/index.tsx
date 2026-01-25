import React, { memo } from 'react'
import { View, Text, Pressable, Platform, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { StarDisplay } from '@/components/common/StarDisplay'
import { createStyles } from './styles'

interface ActivityCardProps {
  icon: keyof typeof MaterialIcons.glyphMap
  title: string
  subtitle?: string
  rating?: number
  meta?: string
  color?: string
  imageUri?: string
  onPress?: () => void
}

const ActivityCardComponent: React.FC<ActivityCardProps> = ({
  icon,
  title,
  subtitle,
  rating,
  meta,
  color,
  imageUri,
  onPress,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const iconColor = color || theme.colors.primary

  const content = (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <MaterialIcons name={icon} size={24} color={iconColor} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {rating !== undefined && (
          <View style={styles.starsContainer}>
            <StarDisplay rating={rating} size={14} />
          </View>
        )}
        {meta && (
          <Text style={styles.meta} numberOfLines={1}>
            {meta}
          </Text>
        )}
      </View>
      <View style={styles.chevronContainer}>
        {onPress && (
          <MaterialIcons name="chevron-right" size={20} color={theme.colors.textTertiary} />
        )}
      </View>
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

export const ActivityCard = memo(ActivityCardComponent)
