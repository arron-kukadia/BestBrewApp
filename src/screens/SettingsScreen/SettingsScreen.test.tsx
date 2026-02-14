import React from 'react'
import { render, screen } from '@/test-utils'
import { SettingsScreen } from './index'
import { useAuthStore } from '@/stores/authStore'

jest.mock('@/stores/authStore')
jest.mock('@/services/imageService', () => ({
  imageService: {
    deleteAllUserImages: jest.fn().mockResolvedValue(undefined),
  },
}))
jest.mock('@/components/Settings/PreferencesSection', () => ({
  PreferencesSection: () => null,
}))

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
