import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { authService } from '@/services/authService'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { IconCircle } from '@/components/common/IconCircle'
import { ButtonWithIcon } from '@/components/common/ButtonWithIcon'
import { createStyles } from './styles'

interface ForgotPasswordScreenProps {
  onBack: () => void
  onCodeSent: (email: string) => void
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onCodeSent,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    setIsLoading(true)
    try {
      await authService.resetPassword({ email: email.trim() })
      onCodeSent(email.trim())
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send reset code. Please try again.'
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
        <ButtonWithIcon onPress={onBack} iconName="arrow-back" testID="back-button" />

        <View style={styles.contentSection}>
          <IconCircle icon="lock-reset" size="large" />

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a code to reset your password.
          </Text>

          <View style={styles.inputWrapper}>
            <Input
              icon="email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <Button title="Send Reset Code" onPress={handleResetPassword} isLoading={isLoading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
