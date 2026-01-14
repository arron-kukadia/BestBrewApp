import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.bodyMedium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    chipWrapper: {
      alignItems: 'center',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      ...theme.typography.bodySm,
      color: theme.colors.text,
    },
    chipTextSelected: {
      color: theme.colors.surface,
    },
    checkIcon: {
      marginLeft: theme.spacing.xs,
    },
    intensityRow: {
      flexDirection: 'row',
      gap: 4,
      marginTop: 4,
    },
    intensityDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    intensityDotActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    intensityText: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },
    intensityTextActive: {
      color: theme.colors.surface,
    },
  })
