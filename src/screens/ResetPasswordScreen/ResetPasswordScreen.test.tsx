import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { ResetPasswordScreen } from './index'

describe('ResetPasswordScreen', () => {
  const mockOnBack = jest.fn()
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )
    expect(screen.getByText('Create New Password')).toBeOnTheScreen()
  })

  it('displays the email in subtitle', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )
    expect(screen.getByText(/test@example.com/)).toBeOnTheScreen()
  })

  it('renders verification code input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )
    expect(screen.getByPlaceholderText('Verification Code')).toBeOnTheScreen()
  })

  it('renders new password input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )
    expect(screen.getByPlaceholderText('New Password')).toBeOnTheScreen()
  })

  it('renders confirm password input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )
    expect(screen.getByPlaceholderText('Confirm New Password')).toBeOnTheScreen()
  })

  it('calls onBack when back button is pressed', async () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    )

    await userEvent.press(screen.getByTestId('back-button'))
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })
})
