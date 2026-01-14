import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { FlavourNote } from '@/types'
import { createStyles } from './styles'

interface FlavourNoteSelectorProps {
  options: string[]
  selectedNotes: FlavourNote[]
  onToggle: (name: string) => void
  onIntensityChange: (name: string, intensity: 1 | 2 | 3) => void
  label?: string
}

export const FlavourNoteSelector: React.FC<FlavourNoteSelectorProps> = ({
  options,
  selectedNotes,
  onToggle,
  onIntensityChange,
  label,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const getSelectedNote = (name: string): FlavourNote | undefined => {
    return selectedNotes.find((n) => n.name === name)
  }

  const isSelected = (name: string): boolean => {
    return selectedNotes.some((n) => n.name === name)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.chipsContainer}>
        {options.map((option) => {
          const selected = isSelected(option)
          const note = getSelectedNote(option)

          return (
            <View key={option} style={styles.chipWrapper}>
              <Pressable
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => onToggle(option)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{option}</Text>
                {selected && (
                  <MaterialIcons
                    name="check"
                    size={14}
                    color={theme.colors.surface}
                    style={styles.checkIcon}
                  />
                )}
              </Pressable>
              {selected && (
                <View style={styles.intensityRow}>
                  {([1, 2, 3] as const).map((level) => (
                    <Pressable
                      key={level}
                      style={[
                        styles.intensityDot,
                        note?.intensity === level && styles.intensityDotActive,
                      ]}
                      onPress={() => onIntensityChange(option, level)}
                    >
                      <Text
                        style={[
                          styles.intensityText,
                          note?.intensity === level && styles.intensityTextActive,
                        ]}
                      >
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}
