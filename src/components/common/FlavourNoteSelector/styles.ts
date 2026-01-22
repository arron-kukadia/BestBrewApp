import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.text,
    },
    helperText: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
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
      backgroundColor: `${theme.colors.primary}15`,
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.primary,
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
    addChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: theme.colors.primary,
      gap: 4,
    },
    addChipText: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.primary,
    },
    addInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    addInput: {
      ...theme.typography.bodySmMedium,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
      minWidth: 100,
    },
    addConfirmButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addCancelButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
