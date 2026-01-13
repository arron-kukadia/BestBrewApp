import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    section: {
      marginTop: theme.spacing.xl,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    sectionTitle: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    email: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    logoutContainer: {
      marginTop: 'auto',
      paddingBottom: theme.spacing.xl,
    },
  });
