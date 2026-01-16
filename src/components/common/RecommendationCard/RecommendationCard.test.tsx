import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { RecommendationCard } from './index'

describe('RecommendationCard', () => {
  const defaultProps = {
    title: 'Ethiopian Yirgacheffe',
    subtitle: 'Origin Coffee Roasters',
    reason: 'Based on your love for light roasts',
  }

  it('renders title', () => {
    render(<RecommendationCard {...defaultProps} />)
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeOnTheScreen()
  })

  it('renders subtitle', () => {
    render(<RecommendationCard {...defaultProps} />)
    expect(screen.getByText('Origin Coffee Roasters')).toBeOnTheScreen()
  })

  it('renders reason', () => {
    render(<RecommendationCard {...defaultProps} />)
    expect(screen.getByText('Based on your love for light roasts')).toBeOnTheScreen()
  })

  it('renders match score when provided', () => {
    render(<RecommendationCard {...defaultProps} matchScore={92} />)
    expect(screen.getByText('92%')).toBeOnTheScreen()
  })

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn()
    render(<RecommendationCard {...defaultProps} onPress={onPressMock} />)
    await userEvent.press(screen.getByText('View Details'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
