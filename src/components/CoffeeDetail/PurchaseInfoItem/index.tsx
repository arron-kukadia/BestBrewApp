import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface PurchaseInfoItemProps {
  label: string
  value: string
}

export const PurchaseInfoItem: React.FC<PurchaseInfoItemProps> = ({ label, value }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}
