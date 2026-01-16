import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: theme.spacing.lg,
    },
    chartDescription: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    radarContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
    },
  })
