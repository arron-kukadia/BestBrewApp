import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
    small: {
      width: 64,
      height: 64,
    },
    medium: {
      width: 100,
      height: 100,
    },
    large: {
      width: 120,
      height: 120,
    },
  })
