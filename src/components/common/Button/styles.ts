import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      ...theme.typography.button,
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
