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
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.xl,
    },
    headerSection: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.xl,
    },
    appName: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },
    tagline: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    formSection: {
      paddingVertical: theme.spacing.xl,
    },
    inputWrapper: {
      marginBottom: theme.spacing.md,
    },
    footerSection: {
      alignItems: 'center',
      paddingBottom: theme.spacing.md,
    },
    linkText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.primary,
    },
    registerContainer: {
      flexDirection: 'row',
      marginTop: theme.spacing.md,
    },
    registerText: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
    },
  });
