import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees, useDeleteCoffee, useToggleFavorite } from '@/api/useCoffees'
import { RootStackParamList } from '@/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const useCoffeeDetail = (coffeeId: string) => {
  const navigation = useNavigation<NavigationProp>()
  const user = useAuthStore((state) => state.user)
  const { data: coffees = [] } = useCoffees(user?.id)
  const deleteMutation = useDeleteCoffee()
  const toggleFavoriteMutation = useToggleFavorite()

  const coffee = coffees.find((coffee) => coffee.id === coffeeId)

  const handleToggleFavorite = useCallback(() => {
    if (user?.id && coffee) {
      toggleFavoriteMutation.mutate({
        id: coffee.id,
        userId: user.id,
        isFavorite: !coffee.isFavorite,
      })
    }
  }, [user?.id, coffee, toggleFavoriteMutation])

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Coffee',
      `Are you sure you want to delete "${coffee?.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (user?.id && coffee) {
              deleteMutation.mutate(
                { id: coffeeId, userId: user.id, imageUrl: coffee.imageUrl },
                { onSuccess: () => navigation.goBack() }
              )
            }
          },
        },
      ]
    )
  }, [coffee, user?.id, coffeeId, deleteMutation, navigation])

  const handleEdit = useCallback(() => {
    if (coffee) {
      navigation.navigate('AddEntry', { coffeeId: coffee.id })
    }
  }, [coffee, navigation])

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return {
    coffee,
    handleToggleFavorite,
    handleDelete,
    handleEdit,
    handleGoBack,
  }
}
