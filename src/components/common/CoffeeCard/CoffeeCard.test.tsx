import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { CoffeeCard } from './index'
import { Coffee } from '@/types'

const mockCoffee: Coffee = {
  id: '1',
  userId: 'user1',
  brand: 'Stumptown',
  name: 'Hair Bender',
  origin: 'Ethiopia',
  roastLevel: 'light',
  grindType: 'whole-bean',
  rating: 4.5,
  notes: 'Great coffee',
  flavourNotes: [
    { name: 'fruity', intensity: 3 },
    { name: 'floral', intensity: 2 },
  ],
  isFavorite: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('CoffeeCard', () => {
  it('renders coffee name', () => {
    render(<CoffeeCard coffee={mockCoffee} />)
    expect(screen.getByText('Hair Bender')).toBeOnTheScreen()
  })

  it('renders coffee brand', () => {
    render(<CoffeeCard coffee={mockCoffee} />)
    expect(screen.getByText('Stumptown')).toBeOnTheScreen()
  })

  it('renders coffee origin', () => {
    render(<CoffeeCard coffee={mockCoffee} />)
    expect(screen.getByText('Ethiopia')).toBeOnTheScreen()
  })

  it('renders roast level', () => {
    render(<CoffeeCard coffee={mockCoffee} />)
    expect(screen.getByText('Light')).toBeOnTheScreen()
  })

  it('renders star rating', () => {
    render(<CoffeeCard coffee={mockCoffee} />)
    expect(screen.getByTestId('coffee-card')).toBeOnTheScreen()
  })

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn()
    render(<CoffeeCard coffee={mockCoffee} onPress={onPressMock} />)

    await userEvent.press(screen.getByTestId('coffee-card'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('calls onFavoritePress when favorite button is pressed', async () => {
    const onFavoritePressMock = jest.fn()
    render(<CoffeeCard coffee={mockCoffee} onFavoritePress={onFavoritePressMock} />)

    await userEvent.press(screen.getByTestId('favorite-button'))
    expect(onFavoritePressMock).toHaveBeenCalledTimes(1)
  })
})
