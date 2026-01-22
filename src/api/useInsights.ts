import { useQuery, useQueryClient } from '@tanstack/react-query'
import { insightService } from '@/services/insightService'
import { Coffee } from '@/types'
import { CoffeeHistorySummary, InsightsResponse } from '@/types/insight'
import { getStoredInsights, storeInsights } from '@/stores/insightStorage'

const transformCoffeeHistory = (coffees: Coffee[]): CoffeeHistorySummary[] => {
  return coffees.map((coffee) => ({
    brand: coffee.brand,
    origin: coffee.origin,
    roastLevel: coffee.roastLevel,
    rating: coffee.rating,
    flavourNotes: coffee.flavourNotes?.map((fn) => fn.name) || [],
  }))
}

export const insightKeys = {
  all: ['insights'] as const,
  user: (userId: string) => [...insightKeys.all, userId] as const,
}

interface UseInsightsOptions {
  userId: string | undefined
  coffees: Coffee[]
  enabled?: boolean
}

export const useInsights = ({ userId, coffees, enabled = true }: UseInsightsOptions) => {
  const queryClient = useQueryClient()
  const queryKey = insightKeys.user(userId ?? '')

  const existingData = queryClient.getQueryData<InsightsResponse>(queryKey)
  const cachedData = getStoredInsights()
  const initialData = !existingData && cachedData ? cachedData : undefined

  const query = useQuery<InsightsResponse>({
    queryKey,
    queryFn: async () => {
      if (!userId || coffees.length < 2) {
        throw new Error('Need at least 2 coffees')
      }

      const response = await insightService.getInsights({
        userId,
        coffeeHistory: transformCoffeeHistory(coffees),
      })

      storeInsights(response)
      return response
    },
    initialData,
    enabled: enabled && !!userId && coffees.length >= 2,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  }
}
