import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.text,
    },
    container: {
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
  })
