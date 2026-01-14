import React from 'react'
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface BackButtonProps {
  onPress: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Pressable style={styles.button} onPress={onPress} testID="back-button">
      <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
    </Pressable>
  )
}
