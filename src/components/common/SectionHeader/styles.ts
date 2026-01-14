import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      ...theme.typography.h3,
      color: theme.colors.text,
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.primary,
    },
  });
