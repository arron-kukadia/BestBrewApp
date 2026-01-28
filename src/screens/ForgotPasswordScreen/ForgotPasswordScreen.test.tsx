import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { ForgotPasswordScreen } from './index'

describe('ForgotPasswordScreen', () => {
  const mockOnBack = jest.fn()
  const mockOnCodeSent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />)
    expect(screen.getByText('Reset Password')).toBeOnTheScreen()
  })

  it('renders email input', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />)
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen()
  })

  it('renders send reset code button', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />)
    expect(screen.getByText('Send Reset Code')).toBeOnTheScreen()
  })

  it('calls onBack when back button is pressed', async () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />)

    await userEvent.press(screen.getByTestId('back-button'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })
})
