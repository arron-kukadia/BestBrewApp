import { useMemo } from 'react'
import { Coffee } from '@/types'

interface BrandData {
  value: number
  label: string
  frontColor: string
}

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface DiscoveryData {
  topBrands: BrandData[]
  flavourProfile: FlavourProfile
  hasEntries: boolean
}

export const useDiscoveryData = (coffees: Coffee[], primaryColor: string): DiscoveryData => {
  const hasEntries = coffees.length > 0

  const topBrands = useMemo(() => {
    if (coffees.length === 0) return []
    const brandCounts: Record<string, number> = {}
    coffees.forEach((coffee) => {
      brandCounts[coffee.brand] = (brandCounts[coffee.brand] || 0) + 1
    })
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([brand, count]) => ({
        value: count,
        label: brand,
        frontColor: primaryColor,
      }))
  }, [coffees, primaryColor])

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

  return { topBrands, flavourProfile, hasEntries }
}
