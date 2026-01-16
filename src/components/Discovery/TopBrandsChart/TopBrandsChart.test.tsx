import React from 'react'
import { render, screen } from '@/test-utils'
import { TopBrandsChart } from './index'

jest.mock('react-native-gifted-charts', () => ({
  BarChart: () => null,
}))

describe('TopBrandsChart', () => {
  const mockData = [
    { value: 5, label: 'Stumptown', frontColor: '#6B4423' },
    { value: 3, label: 'Blue Bottle', frontColor: '#6B4423' },
    { value: 2, label: 'Onyx', frontColor: '#6B4423' },
  ]

  it('renders section header', () => {
    render(<TopBrandsChart data={mockData} />)
    expect(screen.getByText('Your Top Brands')).toBeOnTheScreen()
  })

  it('returns null when data is empty', () => {
    render(<TopBrandsChart data={[]} />)
    expect(screen.queryByText('Your Top Brands')).not.toBeOnTheScreen()
  })
})
