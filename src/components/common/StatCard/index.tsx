import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface StatCardProps {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  value: string | number
  color?: string
  animate?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color,
  animate = true,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const iconColor = color || theme.colors.primary

  const numericValue = typeof value === 'number' ? value : parseFloat(value)
  const isNumeric = !isNaN(numericValue)
  const isDecimal = typeof value === 'string' && value.includes('.')
  const [displayValue, setDisplayValue] = useState(animate ? 0 : numericValue)

  useEffect(() => {
    if (!animate || !isNumeric || numericValue <= 0) {
      setDisplayValue(numericValue)
      return
    }

    const duration = 800
    const steps = 30
    const stepTime = duration / steps
    const increment = numericValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(numericValue, increment * step)
      setDisplayValue(current)
      if (step >= steps) {
        clearInterval(timer)
        setDisplayValue(numericValue)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [numericValue, animate, isNumeric])

  const formattedValue =
    isNumeric && numericValue > 0
      ? isDecimal
        ? displayValue.toFixed(1)
        : Math.round(displayValue).toString()
      : String(value)

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <MaterialIcons name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.value}>{formattedValue}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
