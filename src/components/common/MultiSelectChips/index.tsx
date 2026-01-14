import React from 'react'
import { View, Text } from 'react-native'
import { Chip } from '@/components/common/Chip'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface MultiSelectChipsProps {
  label?: string
  options: string[]
  selectedValues: string[]
  onToggle: (value: string) => void
}

export const MultiSelectChips: React.FC<MultiSelectChipsProps> = ({
  label,
  options,
  selectedValues,
  onToggle,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.chips}>
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onPress={() => onToggle(option)}
          />
        ))}
      </View>
    </View>
  )
}
