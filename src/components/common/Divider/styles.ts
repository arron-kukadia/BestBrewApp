import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.spacing.lg,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    text: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
      marginHorizontal: theme.spacing.md,
    },
  });
