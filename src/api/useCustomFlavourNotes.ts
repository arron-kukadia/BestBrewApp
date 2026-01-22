import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customFlavourNoteService } from '@/services/customFlavourNoteService'
import { CustomFlavourNote } from '@/types'

const customFlavourNoteKeys = {
  all: ['customFlavourNotes'] as const,
  list: (userId: string) => [...customFlavourNoteKeys.all, 'list', userId] as const,
}

export const useCustomFlavourNotes = (userId: string | undefined) => {
  return useQuery({
    queryKey: customFlavourNoteKeys.list(userId ?? ''),
    queryFn: () => customFlavourNoteService.listCustomFlavourNotes(userId!),
    enabled: !!userId,
  })
}

export const useCreateCustomFlavourNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { id: string; userId: string; name: string }) =>
      customFlavourNoteService.createCustomFlavourNote({
        ...input,
        createdAt: new Date().toISOString(),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: customFlavourNoteKeys.list(variables.userId),
      })
    },
  })
}

export const useUpdateCustomFlavourNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { id: string; userId: string; name: string }) =>
      customFlavourNoteService.updateCustomFlavourNote(input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: customFlavourNoteKeys.list(variables.userId),
      })
    },
  })
}

export const useDeleteCustomFlavourNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, id }: { userId: string; id: string }) =>
      customFlavourNoteService.deleteCustomFlavourNote(userId, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: customFlavourNoteKeys.list(variables.userId),
      })
    },
  })
}

export const useCombinedFlavourOptions = (
  defaultOptions: string[],
  customNotes: CustomFlavourNote[] | undefined
): string[] => {
  const customNames = customNotes?.map((note) => note.name) ?? []
  return [...defaultOptions, ...customNames]
}
