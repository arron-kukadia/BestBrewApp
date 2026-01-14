import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    illustrationSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
    },
    illustrationContainer: {
      width: 280,
      height: 280,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    coffeeIconWrapper: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: theme.colors.secondaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    decorCircle1: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: theme.colors.primaryLight,
      opacity: 0.3,
      top: 10,
      left: 10,
    },
    decorCircle2: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.secondary,
      opacity: 0.4,
      bottom: 20,
      right: 10,
    },
    decorCircle3: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      opacity: 0.2,
      top: 30,
      right: 40,
    },
    contentSection: {
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },
    brand: {
      ...theme.typography.h1,
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    headline: {
      ...theme.typography.h2,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    buttonSection: {
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
      gap: theme.spacing.md,
    },
  });
