import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

export const ItemSeparator: React.FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return <View style={styles.separator} />
}
