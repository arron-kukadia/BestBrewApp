import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { PreferencesSection } from './index'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

describe('PreferencesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders section title', () => {
    render(<PreferencesSection />)
    expect(screen.getByText('Preferences')).toBeOnTheScreen()
  })

  it('renders custom flavour notes menu item', () => {
    render(<PreferencesSection />)
    expect(screen.getByText('Custom Flavour Notes')).toBeOnTheScreen()
  })

  it('navigates to FlavourNotes screen when menu item pressed', async () => {
    const user = userEvent.setup()
    render(<PreferencesSection />)

    await user.press(screen.getByText('Custom Flavour Notes'))
    expect(mockNavigate).toHaveBeenCalledWith('FlavourNotes')
  })
})
