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
    themeOptions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.surfaceVariant,
    },
    themeOptionActive: {
      backgroundColor: theme.colors.primaryLight,
    },
    themeOptionText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.textSecondary,
    },
    themeOptionTextActive: {
      color: theme.colors.primary,
    },
  })
