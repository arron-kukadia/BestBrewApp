import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { SuccessModal } from './index'

jest.mock('lottie-react-native', () => 'LottieView')

describe('SuccessModal', () => {
  it('renders with default title when visible', () => {
    render(<SuccessModal visible onClose={jest.fn()} />)

    expect(screen.getByText('Success!')).toBeOnTheScreen()
  })

  it('renders with custom title', () => {
    render(<SuccessModal visible title="Coffee Added!" onClose={jest.fn()} />)

    expect(screen.getByText('Coffee Added!')).toBeOnTheScreen()
  })

  it('renders with message', () => {
    render(<SuccessModal visible message="Your coffee has been saved." onClose={jest.fn()} />)

    expect(screen.getByText('Your coffee has been saved.')).toBeOnTheScreen()
  })

  it('renders continue button', () => {
    render(<SuccessModal visible onClose={jest.fn()} />)

    expect(screen.getByText('Continue')).toBeOnTheScreen()
  })

  it('calls onClose when continue button is pressed', async () => {
    const onClose = jest.fn()
    render(<SuccessModal visible onClose={onClose} />)

    await userEvent.press(screen.getByText('Continue'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render content when not visible', () => {
    render(<SuccessModal visible={false} onClose={jest.fn()} />)

    expect(screen.queryByText('Success!')).not.toBeOnTheScreen()
  })
})
