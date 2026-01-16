import React from 'react'
import { render, screen } from '@/test-utils'
import { DiscoveryScreen } from './index'
import { useAuthStore } from '@/stores/authStore'
import { useCoffees } from '@/api/useCoffees'

jest.mock('@/stores/authStore')
jest.mock('@/api/useCoffees')
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

describe('DiscoveryScreen', () => {
  beforeEach(() => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { id: 'user1', email: 'test@example.com' } })
    )
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
    expect(screen.getByText('Recommended for You')).toBeOnTheScreen()
  })

  it('shows top brands section when coffees exist', () => {
    ;(useCoffees as jest.Mock).mockReturnValue({ data: mockCoffees })
    render(<DiscoveryScreen />)
    expect(screen.getByText('Your Top Brands')).toBeOnTheScreen()
  })
})
