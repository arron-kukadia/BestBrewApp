import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

type ThemeMode = 'light' | 'dark' | 'system'

const themeOptions: {
  value: ThemeMode
  label: string
  icon: keyof typeof MaterialIcons.glyphMap
}[] = [
  { value: 'system', label: 'System', icon: 'settings-suggest' },
  { value: 'light', label: 'Light', icon: 'light-mode' },
  { value: 'dark', label: 'Dark', icon: 'dark-mode' },
]

export const AppearanceSection: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <View style={styles.themeOptions}>
        {themeOptions.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.themeOption, theme.mode === option.value && styles.themeOptionActive]}
            onPress={() => theme.setMode(option.value)}
          >
            <MaterialIcons
              name={option.icon}
              size={20}
              color={
                theme.mode === option.value ? theme.colors.primary : theme.colors.textSecondary
              }
            />
            <Text
              style={[
                styles.themeOptionText,
                theme.mode === option.value && styles.themeOptionTextActive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
