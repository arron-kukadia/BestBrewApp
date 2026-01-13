import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { authService } from '@/services/authService';
import { Button } from '@/components/common/Button';
import { IconCircle } from '@/components/common/IconCircle';
import { BackButton } from '@/components/common/BackButton';
import { createStyles } from './styles';

interface ConfirmSignUpScreenProps {
  email: string;
  onConfirmSuccess: () => void;
  onBack: () => void;
}

export const ConfirmSignUpScreen: React.FC<ConfirmSignUpScreenProps> = ({
  email,
  onConfirmSuccess,
  onBack,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }

    setIsLoading(true);
    try {
      await authService.confirmSignUp({ email, code: code.trim() });
      Alert.alert('Success', 'Your account has been verified. Please sign in.', [
        { text: 'OK', onPress: onConfirmSuccess },
      ]);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Confirmation failed. Please try again.';
      Alert.alert('Confirmation Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <BackButton onPress={onBack} />

        <View style={styles.contentSection}>
          <IconCircle icon="mark-email-read" size="large" />

          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>We've sent a verification code to</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter verification code"
              placeholderTextColor={theme.colors.textTertiary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
              maxLength={6}
            />
          </View>

          <Button title="Verify" onPress={handleConfirm} isLoading={isLoading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
