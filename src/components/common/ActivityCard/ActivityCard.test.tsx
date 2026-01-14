import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { ActivityCard } from './index'

describe('ActivityCard', () => {
  it('renders title', () => {
    render(<ActivityCard icon="coffee" title="Ethiopian Yirgacheffe" />)
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeOnTheScreen()
  })

  it('renders subtitle when provided', () => {
    render(<ActivityCard icon="coffee" title="Coffee" subtitle="Light roast" />)
    expect(screen.getByText('Light roast')).toBeOnTheScreen()
  })

  it('renders meta text when provided', () => {
    render(<ActivityCard icon="coffee" title="Coffee" meta="Today" />)
    expect(screen.getByText('Today')).toBeOnTheScreen()
  })

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn()
    render(<ActivityCard icon="coffee" title="Coffee" onPress={onPressMock} />)

    await userEvent.press(screen.getByText('Coffee'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
