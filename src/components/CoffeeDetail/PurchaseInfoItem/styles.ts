import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      minWidth: '45%',
      flex: 1,
    },
    label: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    value: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
  })
