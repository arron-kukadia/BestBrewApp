import { useMemo } from 'react'
import { Coffee } from '@/types'

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface DiscoveryData {
  flavourProfile: FlavourProfile
  hasEntries: boolean
}

export const useDiscoveryData = (coffees: Coffee[]): DiscoveryData => {
  const hasEntries = coffees.length > 0

  const flavourProfile = useMemo(() => {
    if (coffees.length === 0) return { data: [], labels: [] }

    const noteCounts: Record<string, { count: number; weightedScore: number }> = {}
    coffees.forEach((coffee) => {
      coffee.flavourNotes?.forEach((flavourNoteItem) => {
        if (!noteCounts[flavourNoteItem.name]) {
          noteCounts[flavourNoteItem.name] = { count: 0, weightedScore: 0 }
        }
        noteCounts[flavourNoteItem.name].count += 1
        noteCounts[flavourNoteItem.name].weightedScore += coffee.rating
      })
    })

    const sorted = Object.entries(noteCounts)
      .sort((a, b) => b[1].weightedScore - a[1].weightedScore)
      .slice(0, 6)

    if (sorted.length < 3) return { data: [], labels: [] }

    const maxScore = Math.max(...sorted.map(([, data]) => data.weightedScore))
    return {
      data: sorted.map(([, data]) => (data.weightedScore / maxScore) * 100),
      labels: sorted.map(([name]) => name.charAt(0).toUpperCase() + name.slice(1)),
    }
  }, [coffees])

  return { flavourProfile, hasEntries }
}
