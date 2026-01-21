import React from 'react'
import { View, Text } from 'react-native'
import { Chip } from '@/components/common/Chip'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface SelectOption<OptionValue> {
  label: string
  value: OptionValue
}

interface SelectChipsProps<OptionValue> {
  label?: string
  options: SelectOption<OptionValue>[]
  selectedValue: OptionValue | null
  onSelect: (value: OptionValue) => void
  required?: boolean
}

export function SelectChips<OptionValue>({
  label,
  options,
  selectedValue,
  onSelect,
  required,
}: SelectChipsProps<OptionValue>) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
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
