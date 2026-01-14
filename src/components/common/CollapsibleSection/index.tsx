import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
          color={theme.colors.primary}
        />
      </Pressable>
      {isExpanded && (
        <Animated.View
          entering={FadeInUp.duration(200)}
          exiting={FadeOutUp.duration(150)}
          style={styles.content}
        >
          {children}
        </Animated.View>
      )}
    </View>
  )
}
