import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterScreen } from '@/screens/RegisterScreen';
import { ConfirmSignUpScreen } from '@/screens/ConfirmSignUpScreen';
import { ForgotPasswordScreen } from '@/screens/ForgotPasswordScreen';
import { useTheme } from '@/hooks/useTheme';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ConfirmSignUp: { email: string };
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const { colors } = useTheme();
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
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
              setConfirmEmail(email);
              setConfirmPassword(password);
              navigation.navigate('ConfirmSignUp', { email });
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
            onCodeSent={() => navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
