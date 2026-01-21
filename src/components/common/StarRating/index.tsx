import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  maxStars?: number
  size?: number
  readonly?: boolean
  label?: string
  required?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  maxStars = 5,
  size = 32,
  readonly = false,
  label,
  required,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const handlePress = (star: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star)
    }
  }

  return (
    <View style={styles.wrapper} testID="star-rating">
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.container}>
        {Array.from({ length: maxStars }, (_, index) => {
          const star = index + 1
          const isFilled = star <= rating
          const isHalf = star - 0.5 === rating

          return (
            <Pressable
              key={star}
              onPress={() => handlePress(star)}
              disabled={readonly}
              hitSlop={4}
              testID={`star-${star}`}
            >
              <MaterialIcons
                name={isFilled ? 'star' : isHalf ? 'star-half' : 'star-border'}
                size={size}
                color={theme.colors.rating}
              />
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
