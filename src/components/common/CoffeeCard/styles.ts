import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
    },
    pressed: {
      opacity: 0.9,
    },
    content: {
      gap: theme.spacing.sm,
    },
    header: {
      gap: theme.spacing.xs,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      ...theme.typography.bodyLgMedium,
      color: theme.colors.text,
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    brand: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
    },
    details: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    detailText: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    ratingText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.text,
    },
    date: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
    },
    flavourNotes: {
      ...theme.typography.bodySm,
      color: theme.colors.primary,
    },
  })
