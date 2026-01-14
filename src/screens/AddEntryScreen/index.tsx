import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useCoffeeStore } from '@/stores/coffeeStore'
import { BackButton } from '@/components/common/BackButton'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { PriceInput } from '@/components/common/PriceInput'
import { DateInput } from '@/components/common/DateInput'
import { SelectChips } from '@/components/common/SelectChips'
import { FlavourNoteSelector } from '@/components/common/FlavourNoteSelector'
import { StarRating } from '@/components/common/StarRating'
import { CollapsibleSection } from '@/components/common/CollapsibleSection'
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

const PROCESS_OPTIONS = [
  { label: 'Washed', value: 'washed' as const },
  { label: 'Natural', value: 'natural' as const },
  { label: 'Honey', value: 'honey' as const },
  { label: 'Anaerobic', value: 'anaerobic' as const },
  { label: 'Other', value: 'other' as const },
]

const BAG_SIZE_OPTIONS = [
  { label: '250g', value: '250g' as const },
  { label: '500g', value: '500g' as const },
  { label: '1kg', value: '1kg' as const },
  { label: 'Other', value: 'other' as const },
]

const FLAVOUR_OPTIONS = [
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
    processMethod: null,
    rating: 0,
    notes: '',
    flavourNotes: [],
    price: '',
    currency: 'GBP',
    bagSize: null,
    customBagSize: '',
    roastDate: '',
    purchaseLocation: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const updateField = <FieldKey extends keyof CoffeeFormData>(
    key: FieldKey,
    value: CoffeeFormData[FieldKey]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFlavourNote = (name: string) => {
    setFormData((prev) => {
      const exists = prev.flavourNotes.find((note) => note.name === name)
      if (exists) {
        return { ...prev, flavourNotes: prev.flavourNotes.filter((note) => note.name !== name) }
      }
      return { ...prev, flavourNotes: [...prev.flavourNotes, { name, intensity: 2 as const }] }
    })
  }

  const updateFlavourIntensity = (name: string, intensity: 1 | 2 | 3) => {
    setFormData((prev) => ({
      ...prev,
      flavourNotes: prev.flavourNotes.map((note) =>
        note.name === name ? { ...note, intensity } : note
      ),
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
        processMethod: formData.processMethod || undefined,
        rating: formData.rating,
        notes: formData.notes.trim(),
        flavourNotes: formData.flavourNotes,
        price: formData.price ? parseFloat(formData.price) : undefined,
        currency: formData.currency,
        bagSize: formData.bagSize || undefined,
        customBagSize: formData.bagSize === 'other' ? formData.customBagSize : undefined,
        roastDate: formData.roastDate || undefined,
        purchaseLocation: formData.purchaseLocation.trim() || undefined,
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
              placeholder="Origin (e.g. Ethiopia)"
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
            <StarRating
              label="Your Rating"
              rating={formData.rating}
              onRatingChange={(rating) => updateField('rating', rating)}
            />
            <FlavourNoteSelector
              label="Flavour Notes"
              options={FLAVOUR_OPTIONS}
              selectedNotes={formData.flavourNotes}
              onToggle={toggleFlavourNote}
              onIntensityChange={updateFlavourIntensity}
            />
          </View>

          <CollapsibleSection title="Additional Details">
            <SelectChips
              label="Process Method"
              options={PROCESS_OPTIONS}
              selectedValue={formData.processMethod}
              onSelect={(value) => updateField('processMethod', value)}
            />
            <SelectChips
              label="Bag Size"
              options={BAG_SIZE_OPTIONS}
              selectedValue={formData.bagSize}
              onSelect={(value) => updateField('bagSize', value)}
            />
            {formData.bagSize === 'other' && (
              <Input
                icon="scale"
                placeholder="Custom weight (e.g., 340g)"
                value={formData.customBagSize}
                onChangeText={(text) => updateField('customBagSize', text)}
              />
            )}
            <Input
              icon="store"
              placeholder="Store / Website"
              value={formData.purchaseLocation}
              onChangeText={(text) => updateField('purchaseLocation', text)}
            />
            <PriceInput
              value={formData.price}
              onChangeText={(text) => updateField('price', text)}
              currency={formData.currency}
              onCurrencyChange={(currency) => updateField('currency', currency)}
            />
            <DateInput
              value={formData.roastDate}
              onChange={(date) => updateField('roastDate', date)}
              placeholder="Roast Date"
            />
          </CollapsibleSection>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Input
              icon="notes"
              placeholder="Your tasting notes, your favourite brewing method, etc."
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
