import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface DetailItemProps {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  value: string
}

export const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={20} color={theme.colors.primary} />
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  )
}
