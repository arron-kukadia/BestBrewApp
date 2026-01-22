import React from 'react'
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface ButtonWithIconProps {
  onPress: () => void
  iconName: keyof typeof MaterialIcons.glyphMap
  color?: string
  testID?: string
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  onPress,
  iconName,
  color,
  testID = 'icon-button',
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Pressable style={styles.button} onPress={onPress} hitSlop={8} testID={testID}>
      <MaterialIcons name={iconName} size={24} color={color ?? theme.colors.text} />
    </Pressable>
  )
}
