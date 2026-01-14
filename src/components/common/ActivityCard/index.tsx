import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { createStyles } from './styles';

interface ActivityCardProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  meta?: string;
  color?: string;
  onPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  title,
  subtitle,
  meta,
  color,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const iconColor = color || theme.colors.primary;

  const content = (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <MaterialIcons name={icon} size={24} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {meta && <Text style={styles.meta}>{meta}</Text>}
      {onPress && (
        <MaterialIcons name="chevron-right" size={20} color={theme.colors.textTertiary} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: Platform.OS === 'ios' ? 0.7 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};
