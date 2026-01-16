import React from 'react'
import { render, screen } from '@/test-utils'
import { FlavourProfileChart } from './index'

jest.mock('react-native-gifted-charts', () => ({
  RadarChart: () => null,
}))

describe('FlavourProfileChart', () => {
  const mockData = {
    data: [80, 60, 40, 30, 50],
    labels: ['Fruity', 'Chocolate', 'Nutty', 'Floral', 'Citrus'],
  }

  it('renders section header', () => {
    render(<FlavourProfileChart data={mockData} />)
    expect(screen.getByText('Your Flavour Profile')).toBeOnTheScreen()
  })

  it('renders description', () => {
    render(<FlavourProfileChart data={mockData} />)
    expect(screen.getByText('Flavours weighted by your ratings')).toBeOnTheScreen()
  })

  it('returns null when data has fewer than 3 points', () => {
    render(<FlavourProfileChart data={{ data: [80, 60], labels: ['Fruity', 'Chocolate'] }} />)
    expect(screen.queryByText('Your Flavour Profile')).not.toBeOnTheScreen()
  })
})
