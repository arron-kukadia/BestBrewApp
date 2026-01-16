import React from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/common/Button'
import { createStyles } from './styles'

interface WelcomeScreenProps {
  onNavigateToLogin: () => void
  onNavigateToRegister: () => void
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.logoSection}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.brand}>BestBrew</Text>
        <Text style={styles.headline}>Your Personal Coffee Journey</Text>
        <Text style={styles.description}>
          Track every bag of coffee, discover new flavors, and find the perfect coffee tailored to
          your taste.
        </Text>
      </View>

      <View style={styles.buttonSection}>
        <Button title="Sign In" onPress={onNavigateToLogin} />
        <Button title="Create Account" onPress={onNavigateToRegister} variant="outline" />
      </View>
    </SafeAreaView>
  )
}
