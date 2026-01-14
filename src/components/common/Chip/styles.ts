import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
    },
    icon: {
      marginRight: theme.spacing.xs,
    },
    label: {
      ...theme.typography.bodySmMedium,
    },
    labelSelected: {
      color: '#FFFFFF',
    },
  });
