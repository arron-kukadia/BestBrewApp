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
    contentSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
      gap: theme.spacing.sm,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginTop: theme.spacing.lg,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    email: {
      ...theme.typography.bodyMedium,
      color: theme.colors.primary,
      marginBottom: theme.spacing.lg,
    },
    inputContainer: {
      width: '100%',
      marginBottom: theme.spacing.md,
    },
    codeInput: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      ...theme.typography.h3,
      color: theme.colors.text,
      textAlign: 'center',
      letterSpacing: 8,
    },
  });
