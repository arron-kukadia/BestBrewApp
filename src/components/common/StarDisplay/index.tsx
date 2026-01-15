import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { styles } from './styles'

interface StarDisplayProps {
  rating: number
  size?: number
  maxStars?: number
}

export const StarDisplay: React.FC<StarDisplayProps> = ({ rating, size = 14, maxStars = 5 }) => {
  const theme = useTheme()
  const roundedRating = Math.round(rating)

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => (
        <MaterialIcons
          key={index}
          name={index < roundedRating ? 'star' : 'star-border'}
          size={size}
          color={theme.colors.rating}
        />
      ))}
    </View>
  )
}
