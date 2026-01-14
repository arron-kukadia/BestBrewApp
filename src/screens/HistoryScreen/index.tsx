import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

export const HistoryScreen: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.subtitle}>Track your coffee journey</Text>
    </View>
  )
}
