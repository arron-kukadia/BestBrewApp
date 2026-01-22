import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { AccountSection } from '@/components/Settings/AccountSection'
import { AppearanceSection } from '@/components/Settings/AppearanceSection'
import { AccountActions } from '@/components/Settings/AccountActions'
import { RootStackParamList } from '@/types'
import { createStyles } from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const SettingsScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>

        <AccountSection />
        <AppearanceSection />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate('FlavourNotes')}>
            <View style={styles.menuItemContent}>
              <MaterialIcons name="local-cafe" size={20} color={theme.colors.primary} />
              <Text style={styles.menuItemText}>Custom Flavour Notes</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        <AccountActions />
      </ScrollView>
    </SafeAreaView>
  )
}
