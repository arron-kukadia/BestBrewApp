import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { ButtonWithIcon } from './index'

describe('ButtonWithIcon', () => {
  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn()
    render(<ButtonWithIcon onPress={onPressMock} iconName="arrow-back" />)

    await userEvent.press(screen.getByTestId('icon-button'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('renders with custom testID', () => {
    render(<ButtonWithIcon onPress={jest.fn()} iconName="edit" testID="custom-button" />)

    expect(screen.getByTestId('custom-button')).toBeOnTheScreen()
  })

  it('renders different icon names', () => {
    const { rerender } = render(<ButtonWithIcon onPress={jest.fn()} iconName="check" />)
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen()

    rerender(<ButtonWithIcon onPress={jest.fn()} iconName="delete-outline" />)
    expect(screen.getByTestId('icon-button')).toBeOnTheScreen()
  })

  it('does not call onPress multiple times for single press', async () => {
    const onPressMock = jest.fn()
    render(<ButtonWithIcon onPress={onPressMock} iconName="favorite" />)

    await userEvent.press(screen.getByTestId('icon-button'))
    await userEvent.press(screen.getByTestId('icon-button'))
    expect(onPressMock).toHaveBeenCalledTimes(2)
  })
})
