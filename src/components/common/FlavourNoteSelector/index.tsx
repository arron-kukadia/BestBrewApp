import React, { useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import { useTheme } from '@/hooks/useTheme'
import { useAnimationConfig } from '@/hooks/useAnimationConfig'
import { FlavourNote } from '@/types'
import { INTENSITY_LEVELS } from '@/constants/coffee'
import { createStyles } from './styles'

interface FlavourNoteSelectorProps {
  options: string[]
  selectedNotes: FlavourNote[]
  onToggle: (name: string) => void
  onIntensityChange: (name: string, intensity: 1 | 2 | 3) => void
  label?: string
  onAddNote?: (name: string) => void
}

export const FlavourNoteSelector: React.FC<FlavourNoteSelectorProps> = ({
  options,
  selectedNotes,
  onToggle,
  onIntensityChange,
  label,
  onAddNote,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { entering, exitingUp } = useAnimationConfig()
  const [isAdding, setIsAdding] = useState(false)
  const [newNoteName, setNewNoteName] = useState('')

  const handleAddNote = () => {
    const trimmed = newNoteName.trim()
    if (trimmed && onAddNote) {
      const exists = options.some((opt) => opt.toLowerCase() === trimmed.toLowerCase())
      if (!exists) {
        onAddNote(trimmed)
        onToggle(trimmed)
      }
    }
    setNewNoteName('')
    setIsAdding(false)
  }

  const getSelectedNote = (name: string): FlavourNote | undefined => {
    return selectedNotes.find((n) => n.name === name)
  }

  const isSelected = (name: string): boolean => {
    return selectedNotes.some((n) => n.name === name)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.helperText}>
        Tap to select, then rate intensity: 1 (subtle) → 3 (bold)
      </Text>
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
                <Animated.View
                  entering={entering(150)}
                  exiting={exitingUp(150)}
                  style={styles.intensityRow}
                >
                  {INTENSITY_LEVELS.map((level) => (
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
                </Animated.View>
              )}
            </View>
          )
        })}
        {onAddNote && (
          <View style={styles.chipWrapper}>
            {isAdding ? (
              <Animated.View entering={entering(150)} style={styles.addInputContainer}>
                <TextInput
                  style={styles.addInput}
                  value={newNoteName}
                  onChangeText={setNewNoteName}
                  placeholder="New note"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="words"
                  onSubmitEditing={handleAddNote}
                />
                <Pressable style={styles.addConfirmButton} onPress={handleAddNote}>
                  <MaterialIcons name="check" size={18} color={theme.colors.surface} />
                </Pressable>
                <Pressable
                  style={styles.addCancelButton}
                  onPress={() => {
                    setNewNoteName('')
                    setIsAdding(false)
                  }}
                >
                  <MaterialIcons name="close" size={18} color={theme.colors.textSecondary} />
                </Pressable>
              </Animated.View>
            ) : (
              <Pressable style={styles.addChip} onPress={() => setIsAdding(true)}>
                <MaterialIcons name="add" size={16} color={theme.colors.primary} />
                <Text style={styles.addChipText}>Add</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
