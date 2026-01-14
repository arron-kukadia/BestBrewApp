import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
    headerSpacer: {
      width: 40,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl * 2,
    },
    section: {
      marginBottom: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    sectionTitle: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      marginBottom: theme.spacing.sm,
    },
    fieldLabel: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
      marginTop: theme.spacing.xs,
    },
    sectionSubtitle: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginTop: -theme.spacing.xs,
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    halfWidth: {
      flex: 1,
    },
    buttonContainer: {
      marginTop: theme.spacing.md,
    },
  })
