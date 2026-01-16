import React, { useEffect, useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Hub } from 'aws-amplify/utils'
import { TabNavigator } from '@/navigation/TabNavigator'
import { AuthNavigator } from '@/navigation/AuthNavigator'
import { AddEntryScreen } from '@/screens/AddEntryScreen'
import { CoffeeDetailScreen } from '@/screens/CoffeeDetailScreen'
import { RootStackParamList } from '@/types/index'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: React.FC = () => {
  const { colors } = useTheme()
  const { isAuthenticated, isLoading, setUser } = useAuthStore()

  const checkAuth = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser()
      if (user) {
        const attributes = await authService.getUserAttributes()

        let email = attributes?.email || ''
        let name = attributes?.name || attributes?.given_name || ''

        if (!email || !name) {
          const session = await authService.getSession()
          const idToken = session?.tokens?.idToken
          if (idToken) {
            const payload = idToken.payload
            email = email || (payload?.email as string) || ''
            name = name || (payload?.name as string) || (payload?.given_name as string) || ''
          }
        }

        if (!email) {
          email = user.signInDetails?.loginId || ''
        }
        if (!name) {
          name = email.split('@')[0] || user.username
        }

        setUser({
          id: user.userId,
          email,
          name,
          subscriptionStatus: 'free',
          createdAt: new Date().toISOString(),
        })
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [setUser])

  useEffect(() => {
    checkAuth()

    const hubListener = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signInWithRedirect') {
        checkAuth()
      }
      if (payload.event === 'signedOut') {
        setUser(null)
      }
    })

    return () => hubListener()
  }, [checkAuth, setUser])

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="AddEntry">
            {({ navigation, route }) => (
              <AddEntryScreen
                onBack={() => navigation.goBack()}
                onSuccess={() => navigation.goBack()}
                coffeeId={route.params?.coffeeId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
