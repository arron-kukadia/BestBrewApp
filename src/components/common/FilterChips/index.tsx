import React from 'react'
import { ScrollView } from 'react-native'
import { Chip } from '@/components/common/Chip'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface FilterOption<T> {
  label: string
  value: T
}

interface FilterChipsProps<T> {
  options: FilterOption<T>[]
  selectedValue: T | null
  onSelect: (value: T | null) => void
}

export function FilterChips<T>({ options, selectedValue, onSelect }: FilterChipsProps<T>) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip label="All" selected={selectedValue === null} onPress={() => onSelect(null)} />
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
