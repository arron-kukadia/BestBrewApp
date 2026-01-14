import React from 'react'
import { ScrollView } from 'react-native'
import { Chip } from '@/components/common/Chip'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface FilterOption<OptionValue> {
  label: string
  value: OptionValue
}

interface FilterChipsProps<OptionValue> {
  options: FilterOption<OptionValue>[]
  selectedValue: OptionValue | null
  onSelect: (value: OptionValue | null) => void
}

export function FilterChips<OptionValue>({
  options,
  selectedValue,
  onSelect,
}: FilterChipsProps<OptionValue>) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option) => (
        <Chip
          key={String(option.value)}
          label={option.label}
          selected={selectedValue === option.value}
          onPress={() => onSelect(option.value)}
        />
      ))}
    </ScrollView>
  )
}
