import { StyleSheet } from 'react-native'
import { Theme } from '@/theme'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: theme.spacing.lg,
    },
    loadingContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    loadingText: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
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
    profileCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.md,
    },
    profileText: {
      ...theme.typography.body,
      color: theme.colors.text,
      flex: 1,
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
