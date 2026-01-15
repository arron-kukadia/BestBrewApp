import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Divider } from '@/components/common/Divider'
import { createStyles } from './styles'

interface LoginScreenProps {
  onNavigateToRegister: () => void
  onNavigateToForgotPassword: () => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToForgotPassword,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const setUser = useAuthStore((state) => state.setUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password')
      return
    }

    setIsLoading(true)
    try {
      await authService.signIn({ email: email.trim(), password })
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.'
      Alert.alert('Login Failed', message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Google login failed. Please try again.'
      Alert.alert('Google Login Failed', message)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerSection}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.header}>Login</Text>
            <Text style={styles.tagline}>Continue your coffee journey</Text>
          </View>

          <View style={styles.formSection}>
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

            <View style={styles.inputWrapper}>
              <Input
                icon="lock"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
            </View>

            <Button title="Sign In" onPress={handleLogin} isLoading={isLoading} />

            <Divider text="or" />

            <Button
              title="Continue with Google"
              onPress={handleGoogleLogin}
              variant="secondary"
              isLoading={isGoogleLoading}
              icon={<MaterialIcons name="login" size={20} color={theme.colors.text} />}
            />
          </View>

          <View style={styles.footerSection}>
            <Pressable onPress={onNavigateToForgotPassword}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <Pressable onPress={onNavigateToRegister}>
                <Text style={styles.linkText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
