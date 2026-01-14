import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen } from '@/screens/WelcomeScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { RegisterScreen } from '@/screens/RegisterScreen'
import { ConfirmSignUpScreen } from '@/screens/ConfirmSignUpScreen'
import { ForgotPasswordScreen } from '@/screens/ForgotPasswordScreen'
import { ResetPasswordScreen } from '@/screens/ResetPasswordScreen'
import { useTheme } from '@/hooks/useTheme'

type AuthStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  ConfirmSignUp: { email: string }
  ForgotPassword: undefined
  ResetPassword: { email: string }
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator: React.FC = () => {
  const { colors } = useTheme()
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Welcome">
        {({ navigation }) => (
          <WelcomeScreen
            onNavigateToLogin={() => navigation.navigate('Login')}
            onNavigateToRegister={() => navigation.navigate('Register')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onNavigateToRegister={() => navigation.navigate('Register')}
            onNavigateToForgotPassword={() => navigation.navigate('ForgotPassword')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {({ navigation }) => (
          <RegisterScreen
            onNavigateToLogin={() => navigation.navigate('Login')}
            onNavigateToConfirm={(email, password) => {
              setConfirmEmail(email)
              setConfirmPassword(password)
              navigation.navigate('ConfirmSignUp', { email })
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ConfirmSignUp">
        {({ navigation }) => (
          <ConfirmSignUpScreen
            email={confirmEmail}
            password={confirmPassword}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword">
        {({ navigation }) => (
          <ForgotPasswordScreen
            onBack={() => navigation.goBack()}
            onCodeSent={(email) => navigation.navigate('ResetPassword', { email })}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ResetPassword">
        {({ navigation, route }) => (
          <ResetPasswordScreen
            email={route.params.email}
            onBack={() => navigation.goBack()}
            onSuccess={() => navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
