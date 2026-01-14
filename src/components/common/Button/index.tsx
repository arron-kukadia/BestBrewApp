import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  icon,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const buttonStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [buttonStyle, pressed && { opacity: 0.8 }]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.textInverse : theme.colors.text}
        />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </Pressable>
  );
};
