import React from 'react'
import { render, screen } from '@/test-utils'
import { HomeScreen } from './index'
import { useAuthStore } from '@/stores/authStore'

jest.mock('@/stores/authStore')

describe('HomeScreen', () => {
  beforeEach(() => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { name: 'John', email: 'john@example.com' },
      })
    )
  })

  it('renders greeting with user name', () => {
    render(<HomeScreen />)
    expect(screen.getByText('John')).toBeOnTheScreen()
  })

  it('renders stat cards', () => {
    render(<HomeScreen />)
    expect(screen.getByText('Coffees Curated')).toBeOnTheScreen()
    expect(screen.getByText('Avg Rating')).toBeOnTheScreen()
  })

  it('renders empty state when no entries', () => {
    render(<HomeScreen />)
    expect(screen.getByText('No coffees explored yet')).toBeOnTheScreen()
  })

  it('renders action button in empty state', () => {
    render(<HomeScreen />)
    expect(screen.getByText('Start Your Journey')).toBeOnTheScreen()
  })
})
