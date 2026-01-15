import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { StarDisplay } from '@/components/common/StarDisplay'
import { Coffee } from '@/types'
import { createStyles } from './styles'

interface CoffeeCardProps {
  coffee: Coffee
  onPress?: () => void
  onFavoritePress?: () => void
}

const roastLevelLabels: Record<Coffee['roastLevel'], string> = {
  light: 'Light',
  medium: 'Medium',
  'medium-dark': 'Medium-Dark',
  dark: 'Dark',
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, onPress, onFavoritePress }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      testID="coffee-card"
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {coffee.name}
            </Text>
            <Pressable onPress={onFavoritePress} hitSlop={8} testID="favorite-button">
              <MaterialIcons
                name={coffee.isFavorite ? 'favorite' : 'favorite-border'}
                size={20}
                color={coffee.isFavorite ? theme.colors.error : theme.colors.textTertiary}
              />
            </Pressable>
          </View>
          <Text style={styles.brand}>{coffee.brand}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialIcons name="place" size={14} color={theme.colors.textTertiary} />
            <Text style={styles.detailText}>{coffee.origin}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons
              name="local-fire-department"
              size={14}
              color={theme.colors.textTertiary}
            />
            <Text style={styles.detailText}>{roastLevelLabels[coffee.roastLevel]}</Text>
          </View>
        </View>

        {coffee.flavourNotes && coffee.flavourNotes.length > 0 && (
          <Text style={styles.flavourNotes} numberOfLines={1}>
            {coffee.flavourNotes.map((note) => note.name).join(' • ')}
          </Text>
        )}

        <View style={styles.footer}>
          <StarDisplay rating={coffee.rating} size={16} />
          <Text style={styles.date}>{formatDate(coffee.createdAt)}</Text>
        </View>
      </View>
    </Pressable>
  )
}
