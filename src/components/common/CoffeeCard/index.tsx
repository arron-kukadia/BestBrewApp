import React, { memo } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { useImageUrl } from '@/hooks/useImageUrl'
import { StarDisplay } from '@/components/common/StarDisplay'
import { Coffee } from '@/types'
import { formatRelativeDate } from '@/helpers/date'
import { createStyles } from './styles'

interface CoffeeCardProps {
  coffee: Coffee
  onPress?: () => void
  onFavoritePress?: () => void
}

const CoffeeCardComponent: React.FC<CoffeeCardProps> = ({ coffee, onPress, onFavoritePress }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const resolvedImageUrl = useImageUrl(coffee.imageUrl)
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      testID="coffee-card"
    >
      {resolvedImageUrl && <Image source={{ uri: resolvedImageUrl }} style={styles.image} />}
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
          <Text numberOfLines={1} style={styles.brand}>
            {coffee.brand}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialIcons name="place" size={14} color={theme.colors.textTertiary} />
            <Text style={styles.detailText} numberOfLines={1}>
              {coffee.origin}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <StarDisplay rating={coffee.rating} size={16} />
          <Text style={styles.date}>{formatRelativeDate(coffee.createdAt)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export const CoffeeCard = memo(CoffeeCardComponent)
