import { useMemo } from 'react'
import { Coffee } from '@/types'
import { ROAST_LEVEL_LABELS } from '@/constants/coffee'

interface BrandData {
  value: number
  label: string
  frontColor: string
}

interface FlavourProfile {
  data: number[]
  labels: string[]
}

interface Recommendation {
  id: string
  title: string
  subtitle: string
  reason: string
  matchScore: number
}

interface DiscoveryData {
  topBrands: BrandData[]
  flavourProfile: FlavourProfile
  recommendations: Recommendation[]
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
        label: brand.length > 8 ? brand.slice(0, 8) + '…' : brand,
        frontColor: primaryColor,
      }))
  }, [coffees, primaryColor])

  const flavourProfile = useMemo(() => {
    const highRatedCoffees = coffees.filter((coffee) => coffee.rating >= 4)
    if (highRatedCoffees.length === 0) return { data: [], labels: [] }

    const noteCounts: Record<string, number> = {}
    highRatedCoffees.forEach((coffee) => {
      coffee.flavourNotes?.forEach((flavourNoteItem) => {
        noteCounts[flavourNoteItem.name] = (noteCounts[flavourNoteItem.name] || 0) + 1
      })
    })

    const sorted = Object.entries(noteCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    if (sorted.length < 3) return { data: [], labels: [] }

    const maxCount = Math.max(...sorted.map(([, count]) => count))
    return {
      data: sorted.map(([, count]) => (count / maxCount) * 100),
      labels: sorted.map(([name]) => name.charAt(0).toUpperCase() + name.slice(1)),
    }
  }, [coffees])

  const recommendations = useMemo(() => {
    if (coffees.length < 2) return []

    const topRated = [...coffees].sort((a, b) => b.rating - a.rating)[0]
    const roastLabel = ROAST_LEVEL_LABELS[topRated?.roastLevel] || 'Medium'

    return [
      {
        id: '1',
        title: 'Ethiopian Yirgacheffe',
        subtitle: 'Origin Coffee Roasters',
        reason: `Based on your love for ${roastLabel.toLowerCase()} roasts and fruity notes, you might enjoy this bright, citrusy coffee.`,
        matchScore: 92,
      },
      {
        id: '2',
        title: 'Colombian Supremo',
        subtitle: 'Square Mile Coffee',
        reason: `Similar to ${topRated?.brand || 'your favorites'}, this coffee offers balanced sweetness with chocolate undertones.`,
        matchScore: 87,
      },
    ]
  }, [coffees])

  return { topBrands, flavourProfile, recommendations, hasEntries }
}
