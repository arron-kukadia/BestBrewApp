import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { authService } from '@/services/authService'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { IconCircle } from '@/components/common/IconCircle'
import { BackButton } from '@/components/common/BackButton'
import { createStyles } from './styles'

interface ResetPasswordScreenProps {
  email: string
  onBack: () => void
  onSuccess: () => void
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  email,
  onBack,
  onSuccess,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter the verification code')
      return
    }

    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a new password')
      return
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await authService.confirmResetPassword({
        email,
        code: code.trim(),
        newPassword,
      })
      Alert.alert('Success', 'Your password has been reset successfully', [
        { text: 'OK', onPress: onSuccess },
      ])
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to reset password. Please try again.'
      Alert.alert('Error', message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <BackButton onPress={onBack} />

        <View style={styles.contentSection}>
          <IconCircle icon="lock-reset" size="large" />

          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.subtitle}>Enter the code sent to {email} and your new password.</Text>

          <View style={styles.inputWrapper}>
            <Input
              icon="pin"
              placeholder="Verification Code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Input
              icon="lock"
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              isPassword
              isNewPassword
            />
          </View>

          <View style={styles.inputWrapper}>
            <Input
              icon="lock"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              isNewPassword
            />
          </View>

          <Button title="Reset Password" onPress={handleResetPassword} isLoading={isLoading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
