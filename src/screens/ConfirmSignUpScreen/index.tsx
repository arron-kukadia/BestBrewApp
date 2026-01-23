import React, { useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/common/Button'
import { IconCircle } from '@/components/common/IconCircle'
import { ButtonWithIcon } from '@/components/common/ButtonWithIcon'
import { createStyles } from './styles'

interface ConfirmSignUpScreenProps {
  email: string
  password?: string
  onBack: () => void
  onSuccess?: () => void
}

export const ConfirmSignUpScreen: React.FC<ConfirmSignUpScreenProps> = ({
  email,
  password,
  onBack,
  onSuccess,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const setUser = useAuthStore((state) => state.setUser)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleConfirm = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter the confirmation code')
      return
    }

    setIsLoading(true)
    try {
      await authService.confirmSignUp({ email, code: code.trim() })

      if (password) {
        await authService.signIn({ email, password })
        const user = await authService.getCurrentUser()
        if (user) {
          const attributes = await authService.getUserAttributes()
          setUser({
            id: user.userId,
            email: attributes?.email || user.signInDetails?.loginId || email,
            name: attributes?.given_name,
            subscriptionStatus: 'free',
            createdAt: new Date().toISOString(),
          })
        }
      } else {
        Alert.alert('Success', 'Your email has been verified. Please sign in.', [
          { text: 'OK', onPress: onSuccess },
        ])
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Verification failed. Please try again.'
      Alert.alert('Verification Failed', message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await authService.resendSignUpCode(email)
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.')
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to resend code. Please try again.'
      Alert.alert('Error', message)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ButtonWithIcon onPress={onBack} iconName="arrow-back" />

        <View style={styles.contentSection}>
          <IconCircle icon="mark-email-read" size="large" />

          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>We've sent a verification code to</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter code"
              placeholderTextColor={theme.colors.textTertiary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
              maxLength={6}
            />
          </View>

          <Button title="Verify" onPress={handleConfirm} isLoading={isLoading} />

          <Button
            title="Resend Code"
            onPress={handleResendCode}
            variant="secondary"
            isLoading={isResending}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
