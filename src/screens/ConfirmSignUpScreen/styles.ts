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
    backButton: {
      marginTop: theme.spacing.md,
      padding: theme.spacing.sm,
      alignSelf: 'flex-start',
    },
    contentSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    email: {
      ...theme.typography.bodyMedium,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xl,
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
    primaryButton: {
      width: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      ...theme.typography.button,
      color: theme.colors.textInverse,
    },
  });
