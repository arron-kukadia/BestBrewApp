import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

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
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    appName: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    tagline: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    formSection: {
      flex: 0.5,
      justifyContent: 'center',
      paddingVertical: theme.spacing.lg,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    inputIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.text,
      paddingVertical: theme.spacing.md,
    },
    eyeIcon: {
      padding: theme.spacing.xs,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.sm,
    },
    primaryButtonText: {
      ...theme.typography.button,
      color: theme.colors.textInverse,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
      marginHorizontal: theme.spacing.md,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
    },
    googleIcon: {
      marginRight: theme.spacing.sm,
    },
    googleButtonText: {
      ...theme.typography.button,
      color: theme.colors.text,
    },
    footerSection: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.spacing.xl,
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
  });
