import { useState, useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees, useCreateCoffee, useUpdateCoffee } from '@/api/useCoffees'
import { imageService, isLocalUri } from '@/services/imageService'
import { imageUrlKeys } from '@/hooks/useImageUrl'
import { deleteLocalImage } from '@/helpers/image'
import { CoffeeFormData } from '@/types'
import { sanitizeFormField, sanitizePrice, sanitizeRating } from '@/helpers/sanitize'

const INITIAL_FORM_DATA: CoffeeFormData = {
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
  imageUri: undefined,
}

export const useCoffeeForm = (coffeeId?: string, onSuccess?: () => void) => {
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const queryClient = useQueryClient()
  const createMutation = useCreateCoffee()
  const updateMutation = useUpdateCoffee()

  const isEditMode = !!coffeeId
  const existingCoffee = isEditMode ? coffees.find((coffee) => coffee.id === coffeeId) : null

  const [formData, setFormData] = useState<CoffeeFormData>(INITIAL_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const hasPopulated = useRef(false)

  useEffect(() => {
    if (existingCoffee && !hasPopulated.current) {
      hasPopulated.current = true
      setFormData({
        brand: existingCoffee.brand,
        name: existingCoffee.name,
        origin: existingCoffee.origin,
        roastLevel: existingCoffee.roastLevel,
        grindType: existingCoffee.grindType,
        processMethod: existingCoffee.processMethod || null,
        rating: existingCoffee.rating,
        notes: existingCoffee.notes || '',
        flavourNotes: existingCoffee.flavourNotes,
        price: existingCoffee.price?.toString() || '',
        currency: existingCoffee.currency || 'GBP',
        bagSize: existingCoffee.bagSize || null,
        customBagSize: existingCoffee.customBagSize || '',
        roastDate: existingCoffee.roastDate || '',
        purchaseLocation: existingCoffee.purchaseLocation || '',
        imageUri: existingCoffee.imageUrl || undefined,
      })
    }
  }, [existingCoffee])

  const updateField = <K extends keyof CoffeeFormData>(key: K, value: CoffeeFormData[K]) => {
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

  const sanitizeForm = (): CoffeeFormData => ({
    ...formData,
    brand: sanitizeFormField('brand', formData.brand),
    name: sanitizeFormField('name', formData.name),
    origin: sanitizeFormField('origin', formData.origin),
    notes: sanitizeFormField('notes', formData.notes),
    purchaseLocation: sanitizeFormField('purchaseLocation', formData.purchaseLocation),
    customBagSize: sanitizeFormField('customBagSize', formData.customBagSize),
    rating: sanitizeRating(formData.rating),
    flavourNotes: formData.flavourNotes.map((note) => ({
      ...note,
      name: sanitizeFormField('flavourNoteName', note.name),
    })),
  })

  const validateForm = (): boolean => {
    if (!formData.imageUri) {
      Alert.alert('Error', 'Please add a photo of your coffee')
      return false
    }
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

    const sanitized = sanitizeForm()

    setIsLoading(true)
    try {
      const now = new Date().toISOString().split('T')[0]
      const userId = user?.id || ''
      const coffeeIdToUse = isEditMode ? coffeeId! : Date.now().toString()

      if (isEditMode && coffeeId && existingCoffee) {
        const updates: Record<string, unknown> = {
          id: coffeeId,
          userId,
          brand: sanitized.brand,
          name: sanitized.name,
          origin: sanitized.origin || 'Unknown',
          roastLevel: sanitized.roastLevel!,
          grindType: sanitized.grindType!,
          processMethod: sanitized.processMethod || undefined,
          rating: sanitized.rating,
          notes: sanitized.notes,
          flavourNotes: sanitized.flavourNotes,
          price: sanitized.price ? sanitizePrice(sanitized.price) : undefined,
          currency: sanitized.currency,
          bagSize: sanitized.bagSize || undefined,
          customBagSize: sanitized.bagSize === 'other' ? sanitized.customBagSize : undefined,
          roastDate: sanitized.roastDate || undefined,
          purchaseLocation: sanitized.purchaseLocation || undefined,
          updatedAt: now,
        }

        if (sanitized.imageUri && isLocalUri(sanitized.imageUri)) {
          if (existingCoffee.imageUrl) {
            await imageService.deleteImage(existingCoffee.imageUrl)
          }
          const uploadResult = await imageService.uploadCoffeeImage(
            sanitized.imageUri,
            coffeeIdToUse
          )
          updates.imageUrl = uploadResult.key
          await deleteLocalImage(sanitized.imageUri)
          queryClient.removeQueries({ queryKey: imageUrlKeys.signed(uploadResult.key) })
        }

        await updateMutation.mutateAsync(
          updates as unknown as Parameters<typeof updateMutation.mutateAsync>[0]
        )
        setShowSuccess(true)
      } else {
        let imageUrl: string | undefined
        if (sanitized.imageUri && isLocalUri(sanitized.imageUri)) {
          const uploadResult = await imageService.uploadCoffeeImage(
            sanitized.imageUri,
            coffeeIdToUse
          )
          imageUrl = uploadResult.key
          await deleteLocalImage(sanitized.imageUri)
        }
        const coffeeInput: Record<string, unknown> = {
          id: coffeeIdToUse,
          userId,
          brand: sanitized.brand,
          name: sanitized.name,
          origin: sanitized.origin || 'Unknown',
          roastLevel: sanitized.roastLevel!,
          grindType: sanitized.grindType!,
          rating: sanitized.rating,
          flavourNotes: sanitized.flavourNotes,
          isFavorite: false,
          createdAt: now,
          updatedAt: now,
        }
        if (sanitized.processMethod) coffeeInput.processMethod = sanitized.processMethod
        if (sanitized.notes) coffeeInput.notes = sanitized.notes
        if (sanitized.price) coffeeInput.price = sanitizePrice(sanitized.price)
        if (sanitized.price) coffeeInput.currency = sanitized.currency
        if (sanitized.bagSize) coffeeInput.bagSize = sanitized.bagSize
        if (sanitized.bagSize === 'other' && sanitized.customBagSize) {
          coffeeInput.customBagSize = sanitized.customBagSize
        }
        if (sanitized.roastDate) coffeeInput.roastDate = sanitized.roastDate
        if (sanitized.purchaseLocation) {
          coffeeInput.purchaseLocation = sanitized.purchaseLocation
        }
        if (imageUrl) coffeeInput.imageUrl = imageUrl
        await createMutation.mutateAsync(
          coffeeInput as unknown as Parameters<typeof createMutation.mutateAsync>[0]
        )
        setShowSuccess(true)
      }
    } catch (error) {
      console.error('Error saving coffee:', error)
      Alert.alert(
        'Error',
        isEditMode ? 'Failed to update coffee entry' : 'Failed to add coffee entry'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onSuccess?.()
  }

  return {
    formData,
    updateField,
    toggleFlavourNote,
    updateFlavourIntensity,
    handleSubmit,
    isLoading,
    showSuccess,
    handleSuccessClose,
    isEditMode,
  }
}
