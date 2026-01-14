import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { StarRating } from './index'

describe('StarRating', () => {
  it('renders 5 stars by default', () => {
    render(<StarRating rating={0} />)
    expect(screen.getByTestId('star-1')).toBeOnTheScreen()
    expect(screen.getByTestId('star-5')).toBeOnTheScreen()
  })

  it('calls onRatingChange when star is pressed', async () => {
    const onRatingChangeMock = jest.fn()
    render(<StarRating rating={0} onRatingChange={onRatingChangeMock} />)

    await userEvent.press(screen.getByTestId('star-3'))
    expect(onRatingChangeMock).toHaveBeenCalledWith(3)
  })

  it('does not call onRatingChange when readonly', async () => {
    const onRatingChangeMock = jest.fn()
    render(<StarRating rating={3} onRatingChange={onRatingChangeMock} readonly />)

    await userEvent.press(screen.getByTestId('star-4'))
    expect(onRatingChangeMock).not.toHaveBeenCalled()
  })
})
