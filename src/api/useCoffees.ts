import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coffeeService, CreateCoffeeInput, UpdateCoffeeInput } from '@/services/coffeeService'
import { imageService } from '@/services/imageService'
import { Coffee } from '@/types'
import { insightKeys } from './useInsights'
import { clearStoredInsights } from '@/stores/insightStorage'

export const coffeeKeys = {
  all: ['coffees'] as const,
  lists: () => [...coffeeKeys.all, 'list'] as const,
  list: (userId: string) => [...coffeeKeys.lists(), userId] as const,
  details: () => [...coffeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...coffeeKeys.details(), id] as const,
}

export const useCoffees = (userId: string | undefined) => {
  return useQuery({
    queryKey: coffeeKeys.list(userId ?? ''),
    queryFn: () => coffeeService.listCoffees(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export const useCoffee = (userId: string | undefined, id: string) => {
  return useQuery({
    queryKey: coffeeKeys.detail(id),
    queryFn: () => coffeeService.getCoffee(userId!, id),
    enabled: !!userId && !!id,
  })
}

export const useCreateCoffee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCoffeeInput) => coffeeService.createCoffee(input),
    onSuccess: (newCoffee) => {
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(newCoffee.userId), (oldCoffees) =>
        oldCoffees ? [newCoffee, ...oldCoffees] : [newCoffee]
      )
      clearStoredInsights()
      queryClient.invalidateQueries({ queryKey: insightKeys.user(newCoffee.userId) })
    },
  })
}

export const useUpdateCoffee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateCoffeeInput) => coffeeService.updateCoffee(input),
    onSuccess: (updatedCoffee) => {
      queryClient.setQueryData<Coffee>(coffeeKeys.detail(updatedCoffee.id), updatedCoffee)
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(updatedCoffee.userId), (oldCoffees) =>
        oldCoffees?.map((coffee) => (coffee.id === updatedCoffee.id ? updatedCoffee : coffee))
      )
    },
  })
}

export const useDeleteCoffee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      userId,
      imageUrl,
    }: {
      id: string
      userId: string
      imageUrl?: string
    }) => {
      if (imageUrl) {
        const key = imageService.getKeyFromUrl(imageUrl)
        if (key) {
          await imageService.deleteImage(key)
        }
      }
      await coffeeService.deleteCoffee(userId, id)
      return { id, userId }
    },
    onSuccess: ({ id, userId }) => {
      queryClient.removeQueries({ queryKey: coffeeKeys.detail(id) })
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(userId), (oldCoffees) =>
        oldCoffees?.filter((coffee) => coffee.id !== id)
      )
      clearStoredInsights()
      queryClient.invalidateQueries({ queryKey: insightKeys.user(userId) })
    },
  })
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, userId, isFavorite }: { id: string; userId: string; isFavorite: boolean }) =>
      coffeeService.updateCoffee({ id, userId, isFavorite }),
    onSuccess: (updatedCoffee) => {
      queryClient.setQueryData<Coffee>(coffeeKeys.detail(updatedCoffee.id), updatedCoffee)
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(updatedCoffee.userId), (oldCoffees) =>
        oldCoffees?.map((coffee) => (coffee.id === updatedCoffee.id ? updatedCoffee : coffee))
      )
    },
  })
}
