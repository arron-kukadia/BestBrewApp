import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface IconCircleProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  size?: 'small' | 'medium' | 'large';
}

export const IconCircle: React.FC<IconCircleProps> = ({ icon, size = 'large' }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const containerStyle = [
    styles.container,
    size === 'small' && styles.small,
    size === 'medium' && styles.medium,
    size === 'large' && styles.large,
  ];

  const iconSize = size === 'small' ? 32 : size === 'medium' ? 48 : 64;

  return (
    <View style={containerStyle} testID="icon-circle">
      <MaterialIcons name={icon} size={iconSize} color={theme.colors.primary} />
    </View>
  );
};
