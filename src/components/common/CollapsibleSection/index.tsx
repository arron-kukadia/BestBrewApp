import React, { useState } from 'react'
import { View, Text, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

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

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsExpanded(!isExpanded)
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleExpanded}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons
          name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
          color={theme.colors.primary}
        />
      </Pressable>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  )
}
