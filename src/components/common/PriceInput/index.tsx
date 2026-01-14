import React, { useState } from 'react'
import { View, TextInput, Text, Pressable, Modal } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/useTheme'
import { Currency } from '@/types'
import { createStyles } from './styles'

interface CurrencyOption {
  value: Currency
  symbol: string
  label: string
}

const CURRENCIES: CurrencyOption[] = [
  { value: 'GBP', symbol: '£', label: 'GBP' },
  { value: 'USD', symbol: '$', label: 'USD' },
  { value: 'EUR', symbol: '€', label: 'EUR' },
]

interface PriceInputProps {
  value: string
  onChangeText: (text: string) => void
  currency: Currency
  onCurrencyChange: (currency: Currency) => void
  placeholder?: string
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChangeText,
  currency,
  onCurrencyChange,
  placeholder = 'Price',
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [showPicker, setShowPicker] = useState(false)

  const selectedCurrency = CURRENCIES.find((curr) => curr.value === currency) || CURRENCIES[0]

  return (
    <View style={styles.container}>
      <Pressable style={styles.currencySelector} onPress={() => setShowPicker(true)}>
        <Text style={styles.currencySymbol}>{selectedCurrency.symbol}</Text>
        <MaterialIcons name="arrow-drop-down" size={18} color={theme.colors.textSecondary} />
      </Pressable>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        keyboardType="decimal-pad"
      />
      <Modal visible={showPicker} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
          <View style={styles.pickerContainer}>
            {CURRENCIES.map((curr) => (
              <Pressable
                key={curr.value}
                style={[
                  styles.pickerOption,
                  currency === curr.value && styles.pickerOptionSelected,
                ]}
                onPress={() => {
                  onCurrencyChange(curr.value)
                  setShowPicker(false)
                }}
              >
                <Text style={styles.pickerSymbol}>{curr.symbol}</Text>
                <Text
                  style={[
                    styles.pickerLabel,
                    currency === curr.value && styles.pickerLabelSelected,
                  ]}
                >
                  {curr.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
