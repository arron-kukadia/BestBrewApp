import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  color?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, icon, color }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const chipColor = color || theme.colors.primary;

  const content = (
    <View
      style={[
        styles.container,
        selected && { backgroundColor: chipColor },
        !selected && { backgroundColor: `${chipColor}15` },
      ]}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={16}
          color={selected ? theme.colors.textInverse : chipColor}
          style={styles.icon}
        />
      )}
      <Text
        style={[styles.label, selected && styles.labelSelected, !selected && { color: chipColor }]}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};
