import React from 'react'
import { render, screen } from '@/test-utils'
import { DiscoveryScreen } from './index'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'
import { useInsights } from '@/api/useInsights'

jest.mock('@/stores/authStore')
jest.mock('@/api/useCoffees')
jest.mock('@/api/useInsights')
jest.mock('@/services/insightService', () => ({
  insightService: {
    getInsights: jest.fn(),
  },
}))
jest.mock('react-native-gifted-charts', () => ({
  BarChart: () => null,
  RadarChart: () => null,
}))

const mockCoffees = [
  {
    id: '1',
    userId: 'user1',
    brand: 'Stumptown',
    name: 'Hair Bender',
    origin: 'Ethiopia',
    roastLevel: 'light',
    grindType: 'whole-bean',
    rating: 5,
    notes: '',
    flavourNotes: [{ name: 'fruity', intensity: 3 }],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user1',
    brand: 'Stumptown',
    name: 'Holler Mountain',
    origin: 'Colombia',
    roastLevel: 'medium',
    grindType: 'whole-bean',
    rating: 4,
    notes: '',
    flavourNotes: [{ name: 'chocolate', intensity: 2 }],
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockInsightsData = {
  tasteProfile: 'You prefer fruity, light roast coffees from Ethiopia.',
  insights: [
    {
      id: 'insight-1',
      title: 'Origin Explorer',
      description: 'You gravitate towards Ethiopian coffees.',
      icon: 'explore',
    },
  ],
  generatedAt: new Date().toISOString(),
}

describe('DiscoveryScreen', () => {
  beforeEach(() => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { id: 'user1', email: 'test@example.com' } })
    )
    ;(useInsights as jest.Mock).mockReturnValue({
      data: mockInsightsData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })
  })

  it('shows empty state when no coffees', () => {
    ;(useCoffees as jest.Mock).mockReturnValue({ data: [] })
    render(<DiscoveryScreen />)
    expect(screen.getByText('Start your coffee journey')).toBeOnTheScreen()
  })

  it('renders title and subtitle', () => {
    ;(useCoffees as jest.Mock).mockReturnValue({ data: mockCoffees })
    render(<DiscoveryScreen />)
    expect(screen.getByText('Discover')).toBeOnTheScreen()
    expect(screen.getByText('Find your perfect coffee')).toBeOnTheScreen()
  })

  it('shows recommendations section when coffees exist', () => {
    ;(useCoffees as jest.Mock).mockReturnValue({ data: mockCoffees })
    render(<DiscoveryScreen />)
    expect(screen.getByText('Recommendations')).toBeOnTheScreen()
  })

  it('shows loading state for insights', () => {
    ;(useCoffees as jest.Mock).mockReturnValue({ data: mockCoffees })
    ;(useInsights as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    })
    render(<DiscoveryScreen />)
    expect(screen.getByText('Analyzing your taste profile...')).toBeOnTheScreen()
  })
})
