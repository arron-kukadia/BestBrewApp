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
      paddingBottom: 60,
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
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    inputWrapper: {
      width: '100%',
      marginBottom: theme.spacing.md,
    },
  });
