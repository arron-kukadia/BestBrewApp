import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface DividerProps {
  text?: string
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (!text) {
    return <View style={styles.line} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  )
}
