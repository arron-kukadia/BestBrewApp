import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffeeStore } from '@/stores/coffeeStore'
import { BackButton } from '@/components/common/BackButton'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { SelectChips } from '@/components/common/SelectChips'
import { MultiSelectChips } from '@/components/common/MultiSelectChips'
import { StarRating } from '@/components/common/StarRating'
import { Coffee, CoffeeFormData } from '@/types'
import { createStyles } from './styles'

const ROAST_OPTIONS = [
  { label: 'Light', value: 'light' as const },
  { label: 'Medium', value: 'medium' as const },
  { label: 'Med-Dark', value: 'medium-dark' as const },
  { label: 'Dark', value: 'dark' as const },
]

const GRIND_OPTIONS = [
  { label: 'Whole Bean', value: 'whole-bean' as const },
  { label: 'Ground', value: 'ground' as const },
]

const FLAVOR_OPTIONS = [
  'Fruity',
  'Floral',
  'Nutty',
  'Chocolate',
  'Caramel',
  'Citrus',
  'Berry',
  'Earthy',
  'Spicy',
  'Sweet',
]

interface AddEntryScreenProps {
  onBack: () => void
  onSuccess: () => void
}

export const AddEntryScreen: React.FC<AddEntryScreenProps> = ({ onBack, onSuccess }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const user = useAuthStore((state) => state.user)
  const addCoffee = useCoffeeStore((state) => state.addCoffee)

  const [formData, setFormData] = useState<CoffeeFormData>({
    brand: '',
    name: '',
    origin: '',
    roastLevel: 'medium',
    grindType: 'whole-bean',
    rating: 0,
    notes: '',
    flavorNotes: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const updateField = <K extends keyof CoffeeFormData>(key: K, value: CoffeeFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFlavorNote = (flavor: string) => {
    setFormData((prev) => ({
      ...prev,
      flavorNotes: prev.flavorNotes.includes(flavor)
        ? prev.flavorNotes.filter((f) => f !== flavor)
        : [...prev.flavorNotes, flavor],
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a coffee name')
      return false
    }
    if (!formData.brand.trim()) {
      Alert.alert('Error', 'Please enter a brand')
      return false
    }
    if (formData.rating === 0) {
      Alert.alert('Error', 'Please add a rating')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const coffee: Coffee = {
        id: Date.now().toString(),
        userId: user?.id || '',
        brand: formData.brand.trim(),
        name: formData.name.trim(),
        origin: formData.origin.trim() || 'Unknown',
        roastLevel: formData.roastLevel,
        grindType: formData.grindType,
        rating: formData.rating,
        notes: formData.notes.trim(),
        flavorNotes: formData.flavorNotes,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addCoffee(coffee)
      Alert.alert('Success', 'Coffee entry added!', [{ text: 'OK', onPress: onSuccess }])
    } catch {
      Alert.alert('Error', 'Failed to add coffee entry')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <BackButton onPress={onBack} />
          <Text style={styles.title}>Add Coffee</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            <Input
              icon="coffee"
              placeholder="Coffee Name"
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
            />
            <Input
              icon="storefront"
              placeholder="Brand / Roaster"
              value={formData.brand}
              onChangeText={(text) => updateField('brand', text)}
            />
            <Input
              icon="place"
              placeholder="Origin (e.g., Ethiopia, Colombia)"
              value={formData.origin}
              onChangeText={(text) => updateField('origin', text)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <SelectChips
              label="Roast Level"
              options={ROAST_OPTIONS}
              selectedValue={formData.roastLevel}
              onSelect={(value) => updateField('roastLevel', value)}
            />
            <SelectChips
              label="Grind Type"
              options={GRIND_OPTIONS}
              selectedValue={formData.grindType}
              onSelect={(value) => updateField('grindType', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Rating</Text>
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => updateField('rating', rating)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flavor Notes</Text>
            <MultiSelectChips
              options={FLAVOR_OPTIONS}
              selectedValues={formData.flavorNotes}
              onToggle={toggleFlavorNote}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Input
              icon="notes"
              placeholder="Your tasting notes, brewing method, etc."
              value={formData.notes}
              onChangeText={(text) => updateField('notes', text)}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Save Coffee" onPress={handleSubmit} isLoading={isLoading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
