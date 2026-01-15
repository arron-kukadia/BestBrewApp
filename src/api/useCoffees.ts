import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coffeeService, CreateCoffeeInput, UpdateCoffeeInput } from '@/services/coffeeService'
import { Coffee } from '@/types'

export const coffeeKeys = {
  all: ['coffees'] as const,
  lists: () => [...coffeeKeys.all, 'list'] as const,
  list: (userId: string) => [...coffeeKeys.lists(), userId] as const,
  details: () => [...coffeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...coffeeKeys.details(), id] as const,
}

export function useCoffees(userId: string | undefined) {
  return useQuery({
    queryKey: coffeeKeys.list(userId ?? ''),
    queryFn: () => coffeeService.listCoffees(userId!),
    enabled: !!userId,
  })
}

export function useCoffee(userId: string | undefined, id: string) {
  return useQuery({
    queryKey: coffeeKeys.detail(id),
    queryFn: () => coffeeService.getCoffee(userId!, id),
    enabled: !!userId && !!id,
  })
}

export function useCreateCoffee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCoffeeInput) => coffeeService.createCoffee(input),
    onSuccess: (newCoffee) => {
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(newCoffee.userId), (oldCoffees) =>
        oldCoffees ? [newCoffee, ...oldCoffees] : [newCoffee]
      )
    },
  })
}

export function useUpdateCoffee() {
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

export function useDeleteCoffee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) =>
      coffeeService.deleteCoffee(userId, id).then(() => ({ id, userId })),
    onSuccess: ({ id, userId }) => {
      queryClient.removeQueries({ queryKey: coffeeKeys.detail(id) })
      queryClient.setQueryData<Coffee[]>(coffeeKeys.list(userId), (oldCoffees) =>
        oldCoffees?.filter((coffee) => coffee.id !== id)
      )
    },
  })
}

export function useToggleFavorite() {
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
