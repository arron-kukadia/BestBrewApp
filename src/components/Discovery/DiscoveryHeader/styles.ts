import { StyleSheet } from 'react-native'
import { Theme } from '@/theme'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  })
