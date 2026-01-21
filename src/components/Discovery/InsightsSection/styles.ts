import { StyleSheet } from 'react-native'
import { Theme } from '@/theme'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: theme.spacing.lg,
    },
    errorContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    errorText: {
      ...theme.typography.bodySm,
      color: theme.colors.primary,
    },
    insightsContainer: {
      gap: theme.spacing.sm,
    },
    insightCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.md,
    },
    insightContent: {
      flex: 1,
    },
    insightTitle: {
      ...theme.typography.bodyBold,
      color: theme.colors.text,
    },
    insightDescription: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  })
