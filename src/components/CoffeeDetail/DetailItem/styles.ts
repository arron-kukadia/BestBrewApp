import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    content: {
      flex: 1,
    },
    label: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
    },
    value: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
  })
