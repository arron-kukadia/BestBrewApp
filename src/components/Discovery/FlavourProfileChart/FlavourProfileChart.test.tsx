import React from 'react'
import { render, screen } from '@/test-utils'
import { FlavourProfileChart } from './index'

jest.mock('react-native-gifted-charts', () => ({
  RadarChart: () => null,
}))

jest.mock('./RadarChartDisplay', () => ({
  RadarChartDisplay: () => null,
}))

describe('FlavourProfileChart', () => {
  const mockData = {
    data: [80, 60, 40, 30, 50],
    labels: ['Fruity', 'Chocolate', 'Nutty', 'Floral', 'Citrus'],
  }

  it('renders chart container when data has 3+ points', () => {
    const { toJSON } = render(<FlavourProfileChart data={mockData} />)
    expect(toJSON()).not.toBeNull()
  })

  it('renders taste profile when provided', () => {
    render(<FlavourProfileChart data={mockData} tasteProfile="Fruity & Floral" />)
    expect(screen.getByText('Fruity & Floral')).toBeOnTheScreen()
  })

  it('returns null when data has fewer than 3 points', () => {
    const { toJSON } = render(
      <FlavourProfileChart data={{ data: [80, 60], labels: ['Fruity', 'Chocolate'] }} />
    )
    expect(toJSON()).toBeNull()
  })
})
