import React, { useState } from 'react'
import { View, TextInput, Pressable, TextInputProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface InputProps extends Omit<TextInputProps, 'style'> {
  icon?: keyof typeof MaterialIcons.glyphMap
  isPassword?: boolean
  error?: boolean
}

export const Input: React.FC<InputProps> = ({
  icon,
  isPassword = false,
  error = false,
  ...textInputProps
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.container, error && styles.containerError]}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color={theme.colors.textTertiary}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textTertiary}
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize={isPassword ? 'none' : 'sentences'}
        {...textInputProps}
      />
      {isPassword && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          testID="password-toggle"
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={20}
            color={theme.colors.textTertiary}
          />
        </Pressable>
      )}
    </View>
  )
}
