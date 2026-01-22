import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    deleteButton: {
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
    },
    deleteButtonText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.error,
    },
  })
