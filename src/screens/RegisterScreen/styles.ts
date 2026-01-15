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
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    headerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    logo: {
      width: 240,
      height: 240,
    },
    header: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },
    tagline: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    formSection: {
      justifyContent: 'center',
      paddingVertical: theme.spacing.lg,
    },
    inputWrapper: {
      marginBottom: theme.spacing.md,
    },
    footerSection: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    linkText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.primary,
    },
    loginContainer: {
      flexDirection: 'row',
    },
    loginText: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
    },
  })
