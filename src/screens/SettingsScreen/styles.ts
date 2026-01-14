import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    section: {
      marginTop: theme.spacing.lg,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
    },
    sectionTitle: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    email: {
      ...theme.typography.body,
      color: theme.colors.text,
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
    logoutContainer: {
      marginTop: 'auto',
      paddingBottom: theme.spacing.xl,
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
