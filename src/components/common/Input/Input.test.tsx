import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { Input } from './index'

describe('Input', () => {
  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeOnTheScreen()
  })

  it('calls onChangeText when text is entered', async () => {
    const onChangeTextMock = jest.fn()
    render(<Input placeholder="Enter email" onChangeText={onChangeTextMock} />)

    await userEvent.type(screen.getByPlaceholderText('Enter email'), 'test@example.com')
    expect(onChangeTextMock).toHaveBeenCalled()
  })

  it('accepts value prop', () => {
    render(<Input placeholder="Enter text" value="hello" />)
    expect(screen.getByPlaceholderText('Enter text').props.value).toBe('hello')
  })

  it('toggles password visibility when eye icon is pressed', async () => {
    render(<Input placeholder="Password" isPassword value="secret123" />)
    const input = screen.getByPlaceholderText('Password')

    expect(input.props.secureTextEntry).toBe(true)

    const toggleButton = screen.getByTestId('password-toggle')
    await userEvent.press(toggleButton)

    expect(screen.getByPlaceholderText('Password').props.secureTextEntry).toBe(false)
  })

  it('hides password by default when isPassword is true', () => {
    render(<Input placeholder="Password" isPassword />)
    const input = screen.getByPlaceholderText('Password')
    expect(input.props.secureTextEntry).toBe(true)
  })
})
