import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { Button } from '@/components/common/Button';
import { createStyles } from '@/screens/SettingsScreen/styles';

export const AccountActions: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const setUser = useAuthStore((state) => state.setUser);

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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you sure?',
              'Please confirm that you want to permanently delete your account.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete Account',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await authService.deleteAccount();
                      setUser(null);
                    } catch {
                      Alert.alert('Error', 'Failed to delete account. Please try again.');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.logoutContainer}>
      <Button title="Sign Out" onPress={handleLogout} variant="outline" />
      <Pressable style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </Pressable>
    </View>
  );
};
