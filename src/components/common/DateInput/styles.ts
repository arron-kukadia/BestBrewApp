import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      height: 48,
      paddingHorizontal: theme.spacing.md,
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    text: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.text,
    },
    placeholder: {
      color: theme.colors.textTertiary,
    },
  })
