import React from 'react'
import { render, screen } from '@/test-utils'
import { Loader } from './index'

jest.mock('lottie-react-native', () => 'LottieView')

describe('Loader', () => {
  it('renders without text', () => {
    render(<Loader />)

    expect(screen.queryByText(/./)).toBeNull()
  })

  it('renders with text', () => {
    render(<Loader text="Loading..." />)

    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('renders with custom text message', () => {
    render(<Loader text="Analyzing your taste profile..." />)

    expect(screen.getByText('Analyzing your taste profile...')).toBeTruthy()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Loader size="small" />)
    expect(screen.root).toBeTruthy()

    rerender(<Loader size="medium" />)
    expect(screen.root).toBeTruthy()

    rerender(<Loader size="large" />)
    expect(screen.root).toBeTruthy()
  })
})
