import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    noteItem: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    intensityDots: {
      flexDirection: 'row',
      gap: 4,
    },
    intensityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.border,
    },
    intensityDotActive: {
      backgroundColor: theme.colors.primary,
    },
  })
