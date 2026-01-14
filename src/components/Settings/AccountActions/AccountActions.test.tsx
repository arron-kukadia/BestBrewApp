import React from 'react'
import { Alert } from 'react-native'
import { render, screen, userEvent } from '@/test-utils'
import { AccountActions } from './index'
import { useAuthStore } from '@/stores/authStore'

jest.mock('@/stores/authStore')
jest.spyOn(Alert, 'alert')

describe('AccountActions', () => {
  const mockSetUser = jest.fn()

  beforeEach(() => {
    mockSetUser.mockClear()
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setUser: mockSetUser,
      })
    )
  })

  it('renders sign out button', () => {
    render(<AccountActions />)
    expect(screen.getByText('Sign Out')).toBeOnTheScreen()
  })

  it('renders delete account button', () => {
    render(<AccountActions />)
    expect(screen.getByText('Delete Account')).toBeOnTheScreen()
  })

  it('shows confirmation alert when sign out is pressed', async () => {
    render(<AccountActions />)

    await userEvent.press(screen.getByText('Sign Out'))
    expect(Alert.alert).toHaveBeenCalledWith(
      'Sign Out',
      'Are you sure you want to sign out?',
      expect.any(Array)
    )
  })

  it('shows confirmation alert when delete account is pressed', async () => {
    render(<AccountActions />)

    await userEvent.press(screen.getByText('Delete Account'))
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Account',
      expect.stringContaining('permanently delete'),
      expect.any(Array)
    )
  })
})
