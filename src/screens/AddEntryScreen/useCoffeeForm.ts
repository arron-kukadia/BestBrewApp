import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees, useCreateCoffee, useUpdateCoffee } from '@/api/useCoffees'
import { imageService } from '@/services/imageService'
import { deleteLocalImage } from '@/helpers/image'
import { CoffeeFormData } from '@/types'

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

const isLocalImage = (uri?: string): boolean => {
  if (!uri) return false
  return uri.startsWith('file://') || uri.startsWith('ph://')
}

export const useCoffeeForm = (coffeeId?: string, onSuccess?: () => void) => {
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const createMutation = useCreateCoffee()
  const updateMutation = useUpdateCoffee()

  const isEditMode = !!coffeeId
  const existingCoffee = isEditMode ? coffees.find((c) => c.id === coffeeId) : null

  const [formData, setFormData] = useState<CoffeeFormData>(INITIAL_FORM_DATA)
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

    setIsLoading(true)
    try {
      const now = new Date().toISOString().split('T')[0]
      const userId = user?.id || ''
      const coffeeIdToUse = isEditMode ? coffeeId! : Date.now().toString()

      let imageUrl: string | undefined
      if (formData.imageUri && isLocalImage(formData.imageUri)) {
        const uploadResult = await imageService.uploadCoffeeImage(
          formData.imageUri,
          userId,
          coffeeIdToUse
        )
        imageUrl = uploadResult.imageUrl
        await deleteLocalImage(formData.imageUri)
      } else if (formData.imageUri) {
        imageUrl = formData.imageUri
      }

      if (isEditMode && coffeeId && existingCoffee) {
        const updates = {
          id: coffeeId,
          userId,
          brand: (formData.brand || '').trim(),
          name: (formData.name || '').trim(),
          origin: (formData.origin || '').trim() || 'Unknown',
          roastLevel: formData.roastLevel!,
          grindType: formData.grindType!,
          processMethod: formData.processMethod || undefined,
          rating: formData.rating,
          notes: (formData.notes || '').trim(),
          flavourNotes: formData.flavourNotes,
          price: formData.price ? parseFloat(formData.price) : undefined,
          currency: formData.currency,
          bagSize: formData.bagSize || undefined,
          customBagSize: formData.bagSize === 'other' ? formData.customBagSize : undefined,
          roastDate: formData.roastDate || undefined,
          purchaseLocation: (formData.purchaseLocation || '').trim() || undefined,
          imageUrl,
          updatedAt: now,
        }
        await updateMutation.mutateAsync(updates)
        setShowSuccess(true)
      } else {
        const coffeeInput: Record<string, unknown> = {
          id: coffeeIdToUse,
          userId,
          brand: (formData.brand || '').trim(),
          name: (formData.name || '').trim(),
          origin: (formData.origin || '').trim() || 'Unknown',
          roastLevel: formData.roastLevel!,
          grindType: formData.grindType!,
          rating: formData.rating,
          flavourNotes: formData.flavourNotes,
          isFavorite: false,
          createdAt: now,
          updatedAt: now,
        }
        if (formData.processMethod) coffeeInput.processMethod = formData.processMethod
        if ((formData.notes || '').trim()) coffeeInput.notes = (formData.notes || '').trim()
        if (formData.price) coffeeInput.price = parseFloat(formData.price)
        if (formData.price) coffeeInput.currency = formData.currency
        if (formData.bagSize) coffeeInput.bagSize = formData.bagSize
        if (formData.bagSize === 'other' && formData.customBagSize) {
          coffeeInput.customBagSize = formData.customBagSize
        }
        if (formData.roastDate) coffeeInput.roastDate = formData.roastDate
        if ((formData.purchaseLocation || '').trim()) {
          coffeeInput.purchaseLocation = (formData.purchaseLocation || '').trim()
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
