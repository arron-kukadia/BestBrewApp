import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { Button } from '@/components/common/Button';
import { createStyles } from './styles';

type ThemeMode = 'light' | 'dark' | 'system';

const themeOptions: {
  value: ThemeMode;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { value: 'system', label: 'System', icon: 'settings-suggest' },
  { value: 'light', label: 'Light', icon: 'light-mode' },
  { value: 'dark', label: 'Dark', icon: 'dark-mode' },
];

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await authService.signOut();
            setUser(null);
          } catch {
            Alert.alert('Error', 'Failed to sign out. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your experience</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.themeOptions}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.themeOption, theme.mode === option.value && styles.themeOptionActive]}
              onPress={() => theme.setMode(option.value)}
            >
              <MaterialIcons
                name={option.icon}
                size={20}
                color={
                  theme.mode === option.value ? theme.colors.primary : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.themeOptionText,
                  theme.mode === option.value && styles.themeOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Sign Out" onPress={handleLogout} variant="outline" />
      </View>
    </SafeAreaView>
  );
};
