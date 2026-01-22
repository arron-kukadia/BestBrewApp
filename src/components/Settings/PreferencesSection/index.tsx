import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { RootStackParamList } from '@/types'
import { createStyles } from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const PreferencesSection: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation<NavigationProp>()

  return (
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
  )
}
