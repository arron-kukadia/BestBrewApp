import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.full,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      gap: theme.spacing.sm,
      minHeight: 52,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: theme.colors.primaryLight,
      borderWidth: 0,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      ...theme.typography.button,
      fontWeight: '600',
    },
    primaryText: {
      color: theme.colors.textInverse,
    },
    secondaryText: {
      color: theme.colors.text,
    },
    outlineText: {
      color: theme.colors.primary,
    },
  });
