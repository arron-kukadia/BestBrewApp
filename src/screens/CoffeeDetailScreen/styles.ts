import { StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

type Theme = ReturnType<typeof useTheme>

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    headerActions: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    headerButton: {
      padding: theme.spacing.xs,
    },
    contentContainer: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    notFound: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    notFoundText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
    heroImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.xl,
    },
    titleSection: {
      marginBottom: theme.spacing.xl,
    },
    brand: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    name: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    ratingContainer: {
      alignItems: 'flex-start',
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      marginBottom: theme.spacing.md,
    },
    detailsGrid: {
      gap: theme.spacing.md,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
    },
    detailValue: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
    flavourNotesContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    flavourNoteItem: {
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
    purchaseGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    purchaseItem: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      minWidth: '45%',
      flex: 1,
    },
    purchaseLabel: {
      ...theme.typography.bodySm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    purchaseValue: {
      ...theme.typography.bodyMedium,
      color: theme.colors.text,
    },
    notesText: {
      ...theme.typography.body,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      lineHeight: 22,
    },
    metadata: {
      marginTop: theme.spacing.lg,
      paddingTop: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    metadataText: {
      ...theme.typography.bodySm,
      color: theme.colors.textTertiary,
    },
  })
