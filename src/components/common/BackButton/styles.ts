import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      marginTop: theme.spacing.md,
      padding: theme.spacing.sm,
      alignSelf: 'flex-start',
    },
  });
