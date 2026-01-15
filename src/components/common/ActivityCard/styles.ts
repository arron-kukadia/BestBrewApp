import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    content: {
      flex: 1,
    },
    title: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    starsContainer: {
      flexDirection: 'row',
      marginTop: 4,
    },
    meta: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
      marginRight: theme.spacing.sm,
    },
  })
