import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { RegisterScreen } from './index'

jest.mock('@/services/authService')

describe('RegisterScreen', () => {
  const mockNavigateToLogin = jest.fn()
  const mockNavigateToConfirm = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders name input', () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )
    expect(screen.getByPlaceholderText('Name')).toBeOnTheScreen()
  })

  it('renders email input', () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen()
  })

  it('renders password input', () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen()
  })

  it('renders confirm password input', () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )
    expect(screen.getByPlaceholderText('Confirm Password')).toBeOnTheScreen()
  })

  it('renders create account button', () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )
    expect(screen.getAllByText('Create Account').length).toBeGreaterThan(0)
  })

  it('calls onNavigateToLogin when sign in link is pressed', async () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )

    await userEvent.press(screen.getByText('Sign in'))
    expect(mockNavigateToLogin).toHaveBeenCalledTimes(1)
  })

  it('allows user to fill in registration form', async () => {
    render(
      <RegisterScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToConfirm={mockNavigateToConfirm}
      />
    )

    await userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe')
    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123')
    await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123')

    expect(screen.getByPlaceholderText('Name')).toBeOnTheScreen()
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen()
  })
})
