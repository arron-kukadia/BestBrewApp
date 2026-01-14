import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { createStyles } from '@/screens/SettingsScreen/styles';

export const AccountSection: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
};
