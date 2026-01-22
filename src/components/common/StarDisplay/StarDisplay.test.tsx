import React from 'react'
import { render, screen } from '@/test-utils'
import { StarDisplay } from './index'

describe('StarDisplay', () => {
  it('renders with default props', () => {
    render(<StarDisplay rating={3} />)

    expect(screen.root).toBeOnTheScreen()
  })

  it('renders with different ratings', () => {
    const { rerender } = render(<StarDisplay rating={1} />)
    expect(screen.root).toBeOnTheScreen()

    rerender(<StarDisplay rating={5} />)
    expect(screen.root).toBeOnTheScreen()
  })

  it('renders with custom maxStars', () => {
    render(<StarDisplay rating={3} maxStars={10} />)

    expect(screen.root).toBeOnTheScreen()
  })

  it('renders with custom size', () => {
    render(<StarDisplay rating={4} size={20} />)

    expect(screen.root).toBeOnTheScreen()
  })
})
