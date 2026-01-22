import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
    },
    sectionTitle: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    userName: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
  })
