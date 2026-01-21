import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing.md,
      marginRight: theme.spacing.md,
      alignSelf: 'center',
    },
    image: {
      width: 80,
      height: '100%',
      minHeight: 80,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
    },
    title: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    starsContainer: {
      flexDirection: 'row',
      marginTop: 4,
    },
    meta: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
      marginRight: theme.spacing.sm,
    },
  })
