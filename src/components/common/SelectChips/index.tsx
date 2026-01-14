import React from 'react'
import { View, Text } from 'react-native'
import { Chip } from '@/components/common/Chip'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface SelectOption<T> {
  label: string
  value: T
}

interface SelectChipsProps<T> {
  label?: string
  options: SelectOption<T>[]
  selectedValue: T
  onSelect: (value: T) => void
}

export function SelectChips<T>({ label, options, selectedValue, onSelect }: SelectChipsProps<T>) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.chips}>
        {options.map((option) => (
          <Chip
            key={String(option.value)}
            label={option.label}
            selected={selectedValue === option.value}
            onPress={() => onSelect(option.value)}
          />
        ))}
      </View>
    </View>
  )
}
