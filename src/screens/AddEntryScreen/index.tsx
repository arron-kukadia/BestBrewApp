import React, { useState, useEffect } from 'react'
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
import { SuccessModal } from '@/components/common/SuccessModal'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { Coffee, CoffeeFormData } from '@/types'
import {
  ROAST_OPTIONS,
  GRIND_OPTIONS,
  PROCESS_OPTIONS,
  BAG_SIZE_OPTIONS,
  FLAVOUR_OPTIONS,
} from '@/constants/coffee'
import { createStyles } from './styles'

interface AddEntryScreenProps {
  onBack: () => void
  onSuccess: () => void
  coffeeId?: string
}

export const AddEntryScreen: React.FC<AddEntryScreenProps> = ({ onBack, onSuccess, coffeeId }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const user = useAuthStore((state) => state.user)
  const addCoffee = useCoffeeStore((state) => state.addCoffee)
  const updateCoffee = useCoffeeStore((state) => state.updateCoffee)
  const coffees = useCoffeeStore((state) => state.coffees)

  const isEditMode = !!coffeeId
  const existingCoffee = isEditMode ? coffees.find((coffee) => coffee.id === coffeeId) : null

  const [formData, setFormData] = useState<CoffeeFormData>({
    brand: '',
    name: '',
    origin: '',
    roastLevel: null,
    grindType: null,
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
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (existingCoffee) {
      setFormData({
        brand: existingCoffee.brand,
        name: existingCoffee.name,
        origin: existingCoffee.origin,
        roastLevel: existingCoffee.roastLevel,
        grindType: existingCoffee.grindType,
        processMethod: existingCoffee.processMethod || null,
        rating: existingCoffee.rating,
        notes: existingCoffee.notes,
        flavourNotes: existingCoffee.flavourNotes,
        price: existingCoffee.price?.toString() || '',
        currency: existingCoffee.currency || 'GBP',
        bagSize: existingCoffee.bagSize || null,
        customBagSize: existingCoffee.customBagSize || '',
        roastDate: existingCoffee.roastDate || '',
        purchaseLocation: existingCoffee.purchaseLocation || '',
      })
    }
  }, [existingCoffee])

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
    if (!formData.roastLevel) {
      Alert.alert('Error', 'Please select a roast level')
      return false
    }
    if (!formData.grindType) {
      Alert.alert('Error', 'Please select a grind type')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (isEditMode && coffeeId) {
        updateCoffee(coffeeId, {
          brand: formData.brand.trim(),
          name: formData.name.trim(),
          origin: formData.origin.trim() || 'Unknown',
          roastLevel: formData.roastLevel!,
          grindType: formData.grindType!,
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
        })
        setShowSuccess(true)
      } else {
        const coffee: Coffee = {
          id: Date.now().toString(),
          userId: user?.id || '',
          brand: formData.brand.trim(),
          name: formData.name.trim(),
          origin: formData.origin.trim() || 'Unknown',
          roastLevel: formData.roastLevel!,
          grindType: formData.grindType!,
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
        setShowSuccess(true)
      }
    } catch {
      Alert.alert(
        'Error',
        isEditMode ? 'Failed to update coffee entry' : 'Failed to add coffee entry'
      )
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
          <Text style={styles.title}>{isEditMode ? 'Edit Coffee' : 'Add Coffee'}</Text>
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
              <Animated.View
                entering={FadeInRight.duration(200)}
                exiting={FadeOutRight.duration(150)}
              >
                <Input
                  icon="scale"
                  placeholder="Custom weight (e.g., 340g)"
                  value={formData.customBagSize}
                  onChangeText={(text) => updateField('customBagSize', text)}
                />
              </Animated.View>
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
            <Button
              title={isEditMode ? 'Update Coffee' : 'Save Coffee'}
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title={isEditMode ? 'Coffee Updated!' : 'Coffee Added!'}
        message={
          isEditMode
            ? 'Your changes have been saved.'
            : 'Your coffee has been saved to your collection.'
        }
        onClose={() => {
          setShowSuccess(false)
          onSuccess()
        }}
      />
    </SafeAreaView>
  )
}
