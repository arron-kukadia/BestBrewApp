import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, TextInputProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface InputProps extends Omit<TextInputProps, 'style'> {
  icon?: keyof typeof MaterialIcons.glyphMap
  isPassword?: boolean
  isNewPassword?: boolean
  error?: boolean
  label?: string
  required?: boolean
}

export const Input: React.FC<InputProps> = ({
  icon,
  isPassword = false,
  isNewPassword = false,
  error = false,
  label,
  required,
  ...textInputProps
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [showPassword, setShowPassword] = useState(false)

  const getPasswordProps = () => {
    if (!isPassword) return {}
    return {
      secureTextEntry: !showPassword,
      autoCapitalize: 'none' as const,
      autoCorrect: false,
      textContentType: isNewPassword ? ('newPassword' as const) : ('password' as const),
      autoComplete: isNewPassword ? ('new-password' as const) : ('current-password' as const),
    }
  }

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={[styles.inputContainer, error && styles.containerError]}>
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
          {...getPasswordProps()}
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
    </View>
  )
}
