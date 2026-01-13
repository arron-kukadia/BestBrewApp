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
      paddingHorizontal: theme.spacing.lg,
    },
    headerSection: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    appName: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },
    tagline: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    formSection: {
      flex: 0.4,
      justifyContent: 'center',
    },
    inputWrapper: {
      marginBottom: theme.spacing.md,
    },
    footerSection: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
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
