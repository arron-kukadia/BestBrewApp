import React from 'react'
import { render, screen } from '@/test-utils'
import { Divider } from './index'

describe('Divider', () => {
  it('renders without text', () => {
    render(<Divider />)

    expect(screen.queryByText(/./)).toBeNull()
  })

  it('renders with text', () => {
    render(<Divider text="or" />)

    expect(screen.getByText('or')).toBeOnTheScreen()
  })

  it('renders with custom text', () => {
    render(<Divider text="continue with" />)

    expect(screen.getByText('continue with')).toBeOnTheScreen()
  })
})
