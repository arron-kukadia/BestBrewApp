import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    placeholder: {
      height: 160,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    placeholderText: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
    },
    imageContainer: {
      position: 'relative',
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: theme.borderRadius.md,
    },
    removeButton: {
      position: 'absolute',
      top: theme.spacing.sm,
      right: theme.spacing.sm,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    changeButton: {
      position: 'absolute',
      bottom: theme.spacing.sm,
      right: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    changeButtonText: {
      ...theme.typography.bodySm,
      color: '#FFFFFF',
    },
  })
