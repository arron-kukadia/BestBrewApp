import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { FlavourNotesScreen } from './index'
import { useAuthStore } from '@/stores/authStore'
import {
  useCustomFlavourNotes,
  useCreateCustomFlavourNote,
  useUpdateCustomFlavourNote,
  useDeleteCustomFlavourNote,
} from '@/api/useCustomFlavourNotes'

jest.mock('@/stores/authStore')
jest.mock('@/api/useCustomFlavourNotes')
jest.mock('@/services/coffeeService', () => ({
  coffeeService: {
    renameFlavourNoteInCoffees: jest.fn(),
  },
}))
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}))
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View
  return {
    default: { createAnimatedComponent: (component: unknown) => component },
    View,
    FadeInUp: { duration: () => ({ delay: () => ({}) }) },
    FadeOutDown: { duration: () => ({}) },
    useReducedMotion: jest.fn(() => false),
  }
})
jest.mock('@shopify/flash-list', () => {
  const { createElement, Fragment } = require('react')
  return {
    FlashList: ({
      data,
      renderItem,
      keyExtractor,
      ListEmptyComponent,
    }: {
      data: unknown[]
      renderItem: (info: { item: unknown; index: number }) => React.ReactNode
      keyExtractor?: (item: unknown, index: number) => string
      ListEmptyComponent?: () => React.ReactNode
    }) => {
      if (!data || data.length === 0) {
        return ListEmptyComponent ? ListEmptyComponent() : null
      }
      return data.map((item, index) =>
        createElement(
          Fragment,
          { key: keyExtractor ? keyExtractor(item, index) : index },
          renderItem({ item, index })
        )
      )
    },
  }
})

const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}))

const mockCustomNotes = [
  { id: 'note-1', userId: 'user1', name: 'Blueberry', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'note-2', userId: 'user1', name: 'Maple', createdAt: '2024-01-02T00:00:00Z' },
]

describe('FlavourNotesScreen', () => {
  const mockCreateMutate = jest.fn()
  const mockUpdateMutate = jest.fn()
  const mockDeleteMutate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { id: 'user1', email: 'test@example.com' } })
    )
    ;(useCustomFlavourNotes as jest.Mock).mockReturnValue({
      data: mockCustomNotes,
    })
    ;(useCreateCustomFlavourNote as jest.Mock).mockReturnValue({
      mutate: mockCreateMutate,
      isPending: false,
    })
    ;(useUpdateCustomFlavourNote as jest.Mock).mockReturnValue({
      mutate: mockUpdateMutate,
      isPending: false,
    })
    ;(useDeleteCustomFlavourNote as jest.Mock).mockReturnValue({
      mutate: mockDeleteMutate,
      isPending: false,
    })
  })

  it('renders header with title', () => {
    render(<FlavourNotesScreen />)
    expect(screen.getByText('Custom Flavour Notes')).toBeOnTheScreen()
  })

  it('renders description text', () => {
    render(<FlavourNotesScreen />)
    expect(screen.getByText(/Create your own flavour notes to use alongside/)).toBeOnTheScreen()
  })

  it('renders existing custom notes', () => {
    render(<FlavourNotesScreen />)
    expect(screen.getByText('Blueberry')).toBeOnTheScreen()
    expect(screen.getByText('Maple')).toBeOnTheScreen()
  })

  it('shows empty state when no custom notes', () => {
    ;(useCustomFlavourNotes as jest.Mock).mockReturnValue({
      data: [],
    })
    render(<FlavourNotesScreen />)
    expect(screen.getByText('No Custom Notes Yet')).toBeOnTheScreen()
  })

  it('renders add input and button', () => {
    render(<FlavourNotesScreen />)
    expect(screen.getByPlaceholderText('Add new flavour note...')).toBeOnTheScreen()
  })

  it('navigates back when back button pressed', async () => {
    const user = userEvent.setup()
    render(<FlavourNotesScreen />)

    const backButton = screen.getByTestId('icon-button')
    await user.press(backButton)

    expect(mockGoBack).toHaveBeenCalled()
  })

  it('has an input for adding new notes', () => {
    render(<FlavourNotesScreen />)
    const input = screen.getByPlaceholderText('Add new flavour note...')
    expect(input).toBeOnTheScreen()
  })

  it('shows edit and delete buttons for each note', () => {
    render(<FlavourNotesScreen />)
    expect(screen.getByTestId('edit-note-1')).toBeOnTheScreen()
    expect(screen.getByTestId('delete-note-1')).toBeOnTheScreen()
    expect(screen.getByTestId('edit-note-2')).toBeOnTheScreen()
    expect(screen.getByTestId('delete-note-2')).toBeOnTheScreen()
  })
})
