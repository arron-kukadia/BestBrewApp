import React from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { useTheme } from '@/hooks/useTheme'
import { useAnimationConfig } from '@/hooks/useAnimationConfig'
import { ButtonWithIcon } from '@/components/common/ButtonWithIcon'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { PriceInput } from '@/components/common/PriceInput'
import { DateInput } from '@/components/common/DateInput'
import { SelectChips } from '@/components/common/SelectChips'
import { FlavourNoteSelector } from '@/components/common/FlavourNoteSelector'
import { StarRating } from '@/components/common/StarRating'
import { CollapsibleSection } from '@/components/common/CollapsibleSection'
import { SuccessModal } from '@/components/common/SuccessModal'
import { ImagePicker } from '@/components/common/ImagePicker'
import { Loader } from '@/components/common/Loader'
import {
  ROAST_OPTIONS,
  GRIND_OPTIONS,
  PROCESS_OPTIONS,
  BAG_SIZE_OPTIONS,
  FLAVOUR_OPTIONS,
} from '@/constants/coffee'
import { useAuthStore } from '@/stores/authStore'
import { useCustomFlavourNotes, useCombinedFlavourOptions } from '@/api/useCustomFlavourNotes'
import { createStyles } from './styles'
import { useCoffeeForm } from './useCoffeeForm'

interface AddEntryScreenProps {
  onBack: () => void
  onSuccess: () => void
  coffeeId?: string
}

export const AddEntryScreen: React.FC<AddEntryScreenProps> = ({ onBack, onSuccess, coffeeId }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { enteringRight, exitingRight } = useAnimationConfig()
  const user = useAuthStore((state) => state.user)
  const { data: customNotes } = useCustomFlavourNotes(user?.id)
  const flavourOptions = useCombinedFlavourOptions(FLAVOUR_OPTIONS, customNotes)

  const {
    formData,
    updateField,
    toggleFlavourNote,
    updateFlavourIntensity,
    handleSubmit,
    isLoading,
    showSuccess,
    handleSuccessClose,
    isEditMode,
  } = useCoffeeForm(coffeeId, onSuccess)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <ButtonWithIcon onPress={onBack} iconName="arrow-back" />
          <Text style={styles.title}>{isEditMode ? 'Edit Coffee' : 'Add Coffee'}</Text>
          {isEditMode ? (
            <ButtonWithIcon
              onPress={handleSubmit}
              iconName="check"
              color={theme.colors.primary}
              testID="submit-edit-button"
            />
          ) : (
            <View style={styles.headerSpacer} />
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <View style={styles.section}>
            <ImagePicker
              imageUri={formData.imageUri}
              onImageSelected={(uri) => updateField('imageUri', uri)}
              onImageRemoved={() => updateField('imageUri', undefined)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            <Input
              icon="coffee"
              placeholder="Coffee Name"
              label="Coffee Name"
              autoCapitalize="words"
              required
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
            />
            <Input
              icon="storefront"
              placeholder="Brand / Roaster"
              label="Brand / Roaster"
              autoCapitalize="words"
              required
              value={formData.brand}
              onChangeText={(text) => updateField('brand', text)}
            />
            <Input
              icon="place"
              placeholder="e.g. Ethiopia"
              label="Origin"
              autoCapitalize="words"
              value={formData.origin}
              onChangeText={(text) => updateField('origin', text)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <SelectChips
              label="Roast Level"
              required
              options={ROAST_OPTIONS}
              selectedValue={formData.roastLevel}
              onSelect={(value) => {
                if (value === formData.roastLevel) {
                  return updateField('roastLevel', null)
                }

                return updateField('roastLevel', value)
              }}
            />
            <SelectChips
              label="Grind Type"
              required
              options={GRIND_OPTIONS}
              selectedValue={formData.grindType}
              onSelect={(value) => {
                if (value === formData.grindType) {
                  return updateField('grindType', null)
                }
                return updateField('grindType', value)
              }}
            />
            <StarRating
              label="Your Rating"
              required
              rating={formData.rating}
              onRatingChange={(rating) => updateField('rating', rating)}
            />
            <FlavourNoteSelector
              label="Flavour Notes"
              options={flavourOptions}
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
              onSelect={(value) => {
                if (value === formData.processMethod) {
                  return updateField('processMethod', null)
                }
                return updateField('processMethod', value)
              }}
            />
            <SelectChips
              label="Bag Size"
              options={BAG_SIZE_OPTIONS}
              selectedValue={formData.bagSize}
              onSelect={(value) => {
                if (value === formData.bagSize) {
                  return updateField('bagSize', null)
                }
                return updateField('bagSize', value)
              }}
            />
            {formData.bagSize === 'other' && (
              <Animated.View entering={enteringRight(200)} exiting={exitingRight(150)}>
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
        onClose={handleSuccessClose}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Loader text="Saving..." />
        </View>
      )}
    </SafeAreaView>
  )
}
