import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      marginBottom: theme.spacing.md,
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },
    section: {
      marginTop: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    profileCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    profileText: {
      ...theme.typography.body,
      color: theme.colors.text,
      flex: 1,
      lineHeight: 22,
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
      gap: theme.spacing.sm,
    },
    insightContent: {
      flex: 1,
    },
    insightTitle: {
      ...theme.typography.bodyBold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    insightDescription: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      lineHeight: 20,
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
      color: theme.colors.textSecondary,
    },
  })
