import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import { Chip } from '@/components/common/Chip'
import { INTENSITY_LEVELS } from '@/constants/coffee'
import { FlavourNote } from '@/types'
import { createStyles } from './styles'

interface FlavourNotesDisplayProps {
  notes: FlavourNote[]
}

export const FlavourNotesDisplay: React.FC<FlavourNotesDisplayProps> = ({ notes }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {notes.map((note) => (
        <View key={note.name} style={styles.noteItem}>
          <Chip label={note.name} selected />
          <View style={styles.intensityDots}>
            {INTENSITY_LEVELS.map((level) => (
              <View
                key={level}
                style={[styles.intensityDot, level <= note.intensity && styles.intensityDotActive]}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}
