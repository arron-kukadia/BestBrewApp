import React, { useState } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './styles'

interface DateInputProps {
  value: string
  onChange: (dateString: string) => void
  placeholder?: string
  icon?: keyof typeof MaterialIcons.glyphMap
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  icon = 'event',
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [showPicker, setShowPicker] = useState(false)

  const dateValue = value ? new Date(value) : new Date()

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false)
    }
    if (event.type === 'set' && selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0]
      onChange(formatted)
      if (Platform.OS === 'ios') {
        setShowPicker(false)
      }
    } else if (event.type === 'dismissed') {
      setShowPicker(false)
    }
  }

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <View>
      <Pressable style={styles.container} onPress={() => setShowPicker(true)}>
        <MaterialIcons
          name={icon}
          size={20}
          color={theme.colors.textTertiary}
          style={styles.icon}
        />
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? formatDisplayDate(value) : placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={20} color={theme.colors.textTertiary} />
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  )
}
