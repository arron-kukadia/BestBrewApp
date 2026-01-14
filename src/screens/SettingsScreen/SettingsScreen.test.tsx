import React from 'react'
import { render, screen } from '@/test-utils'
import { SettingsScreen } from './index'
import { useAuthStore } from '@/stores/authStore'

jest.mock('@/stores/authStore')

describe('SettingsScreen', () => {
  beforeEach(() => {
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { email: 'test@example.com' },
        setUser: jest.fn(),
      })
    )
  })

  it('renders settings title', () => {
    render(<SettingsScreen />)
    expect(screen.getByText('Settings')).toBeOnTheScreen()
  })

  it('renders subtitle', () => {
    render(<SettingsScreen />)
    expect(screen.getByText('Customize your experience')).toBeOnTheScreen()
  })
})
