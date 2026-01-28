import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { LoginScreen } from './index'

describe('LoginScreen', () => {
  const mockNavigateToRegister = jest.fn()
  const mockNavigateToForgotPassword = jest.fn()
  const mockNavigateToConfirmSignUp = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderLoginScreen = () =>
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
        onNavigateToConfirmSignUp={mockNavigateToConfirmSignUp}
      />
    )

  it('renders email input', () => {
    renderLoginScreen()
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen()
  })

  it('renders password input', () => {
    renderLoginScreen()
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen()
  })

  it('renders sign in button', () => {
    renderLoginScreen()
    expect(screen.getByText('Sign In')).toBeOnTheScreen()
  })

  it('renders forgot password link', () => {
    renderLoginScreen()
    expect(screen.getByText('Forgot Password?')).toBeOnTheScreen()
  })

  it('calls onNavigateToForgotPassword when forgot password is pressed', async () => {
    renderLoginScreen()
    await userEvent.press(screen.getByText('Forgot Password?'))
    expect(mockNavigateToForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('calls onNavigateToRegister when sign up is pressed', async () => {
    renderLoginScreen()
    await userEvent.press(screen.getByText('Sign up'))
    expect(mockNavigateToRegister).toHaveBeenCalledTimes(1)
  })
})
