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
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Divider } from '@/components/common/Divider'
import { createStyles } from './styles'

interface RegisterScreenProps {
  onNavigateToLogin: () => void
  onNavigateToConfirm: (email: string, password: string) => void
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
  onNavigateToConfirm,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const validatePassword = (pwd: string): boolean => {
    return pwd.length >= 8
  }

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await authService.signUp({ email: email.trim(), password, name: name.trim() })
      onNavigateToConfirm(email.trim(), password)
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Registration failed. Please try again.'
      Alert.alert('Registration Failed', message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Google sign up failed. Please try again.'
      Alert.alert('Google Sign Up Failed', message)
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
        >
          <View style={styles.headerSection}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.header}>Create Account</Text>
            <Text style={styles.tagline}>Start your coffee journey</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <Input
                icon="person"
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

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

            <View style={styles.inputWrapper}>
              <Input
                icon="lock"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
              />
            </View>

            <Button title="Create Account" onPress={handleRegister} isLoading={isLoading} />

            <Divider text="or" />

            <Button
              title="Continue with Google"
              onPress={handleGoogleRegister}
              variant="secondary"
              isLoading={isGoogleLoading}
              icon={<MaterialIcons name="login" size={20} color={theme.colors.text} />}
            />
          </View>

          <View style={styles.footerSection}>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Pressable onPress={onNavigateToLogin}>
                <Text style={styles.linkText}>Sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
