import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { AccountSection } from '@/components/Settings/AccountSection'
import { AppearanceSection } from '@/components/Settings/AppearanceSection'
import { PreferencesSection } from '@/components/Settings/PreferencesSection'
import { AccountActions } from '@/components/Settings/AccountActions'
import { createStyles } from './styles'

export const SettingsScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>

        <View style={styles.content}>
          <AccountSection />
          <AppearanceSection />
          <PreferencesSection />
          <AccountActions />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
