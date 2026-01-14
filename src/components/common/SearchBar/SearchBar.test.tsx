import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { SearchBar } from './index'

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar value="" onChangeText={() => {}} placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeOnTheScreen()
  })

  it('displays current value', () => {
    render(<SearchBar value="coffee" onChangeText={() => {}} />)
    expect(screen.getByDisplayValue('coffee')).toBeOnTheScreen()
  })

  it('calls onChangeText when text is entered', async () => {
    const onChangeTextMock = jest.fn()
    render(<SearchBar value="" onChangeText={onChangeTextMock} />)

    await userEvent.type(screen.getByTestId('search-input'), 'latte')
    expect(onChangeTextMock).toHaveBeenCalled()
  })

  it('shows clear button when value is not empty', () => {
    render(<SearchBar value="coffee" onChangeText={() => {}} />)
    expect(screen.getByTestId('clear-search')).toBeOnTheScreen()
  })

  it('clears text when clear button is pressed', async () => {
    const onChangeTextMock = jest.fn()
    render(<SearchBar value="coffee" onChangeText={onChangeTextMock} />)

    await userEvent.press(screen.getByTestId('clear-search'))
    expect(onChangeTextMock).toHaveBeenCalledWith('')
  })

  it('does not show clear button when value is empty', () => {
    render(<SearchBar value="" onChangeText={() => {}} />)
    expect(screen.queryByTestId('clear-search')).not.toBeOnTheScreen()
  })
})
