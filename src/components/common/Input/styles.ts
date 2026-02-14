import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      gap: theme.spacing.xs,
    },
    label: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.text,
    },
    required: {
      color: theme.colors.error,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
    },
    containerError: {
      borderColor: theme.colors.error,
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.text,
    },
    eyeIcon: {
      padding: theme.spacing.xs,
    },
    charCount: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.textTertiary,
      textAlign: 'right',
    },
  })
