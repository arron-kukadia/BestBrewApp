import React from 'react'
import { Text } from 'react-native'
import { render, screen } from '@/test-utils'
import { Card } from './index'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeOnTheScreen()
  })

  it('renders with different variants', () => {
    const { rerender } = render(
      <Card variant="default">
        <Text>Default</Text>
      </Card>
    )
    expect(screen.getByText('Default')).toBeOnTheScreen()

    rerender(
      <Card variant="elevated">
        <Text>Elevated</Text>
      </Card>
    )
    expect(screen.getByText('Elevated')).toBeOnTheScreen()

    rerender(
      <Card variant="outlined">
        <Text>Outlined</Text>
      </Card>
    )
    expect(screen.getByText('Outlined')).toBeOnTheScreen()
  })
})
