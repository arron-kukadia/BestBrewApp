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
    },
    currencySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
      height: '100%',
    },
    currencySymbol: {
      ...theme.typography.bodyLgMedium,
      color: theme.colors.text,
    },
    input: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.md,
      height: '100%',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.sm,
      minWidth: 150,
    },
    pickerOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      gap: theme.spacing.sm,
    },
    pickerOptionSelected: {
      backgroundColor: theme.colors.primaryLight,
    },
    pickerSymbol: {
      ...theme.typography.bodyLgMedium,
      color: theme.colors.text,
      width: 24,
    },
    pickerLabel: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    pickerLabelSelected: {
      color: theme.colors.primary,
    },
  })
