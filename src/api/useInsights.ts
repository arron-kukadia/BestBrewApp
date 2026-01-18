import { useMemo } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { insightService } from '@/services/insightService'
import { Coffee } from '@/types'
import { CoffeeHistorySummary, InsightsResponse } from '@/types/insight'

const transformCoffeeHistory = (coffees: Coffee[]): CoffeeHistorySummary[] => {
  return coffees.map((coffee) => ({
    brand: coffee.brand,
    origin: coffee.origin,
    roastLevel: coffee.roastLevel,
    rating: coffee.rating,
    flavourNotes: coffee.flavourNotes?.map((fn) => fn.name) || [],
  }))
}

const getCoffeeHash = (coffees: Coffee[]): string => {
  return coffees
    .map((c) => c.id)
    .sort()
    .join(',')
}

interface UseInsightsOptions {
  userId: string | undefined
  coffees: Coffee[]
  enabled?: boolean
}

export const useInsights = ({ userId, coffees, enabled = true }: UseInsightsOptions) => {
  const coffeeHash = useMemo(() => getCoffeeHash(coffees), [coffees])

  return useQuery<InsightsResponse>({
    queryKey: ['insights', userId, coffeeHash],
    queryFn: async () => {
      if (!userId || coffees.length < 2) {
        throw new Error('Need at least 2 coffees')
      }

      return insightService.getInsights({
        userId,
        coffeeHistory: transformCoffeeHistory(coffees),
      })
    },
    enabled: enabled && !!userId && coffees.length >= 2,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    retry: false,
  })
}

export const insightKeys = {
  all: ['insights'] as const,
  user: (userId: string) => [...insightKeys.all, userId] as const,
}
