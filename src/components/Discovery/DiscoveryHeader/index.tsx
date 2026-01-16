import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

export const DiscoveryHeader: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.subtitle}>Find your perfect coffee</Text>
    </View>
  )
}
