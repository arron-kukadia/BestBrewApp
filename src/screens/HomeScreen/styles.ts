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
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    greeting: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    userName: {
      ...theme.typography.h1,
      color: theme.colors.text,
    },
    statsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.xl,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    loadingContainer: {
      paddingVertical: theme.spacing.xl * 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activityList: {
      gap: theme.spacing.md,
    },
  })
