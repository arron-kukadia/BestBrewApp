import React from 'react'
import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import { createStyles } from './styles'
import { useTheme } from '@/hooks/useTheme'

interface LoaderProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
}

const sizeMap = {
  small: 80,
  medium: 120,
  large: 160,
}

export const Loader: React.FC<LoaderProps> = ({ text, size = 'medium' }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const animationSize = sizeMap[size]

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/animations/loading.json')}
        style={{ width: animationSize, height: animationSize }}
        autoPlay
        loop
      />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}
