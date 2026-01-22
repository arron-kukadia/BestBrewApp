import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { DateInput } from './index'

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker')

describe('DateInput', () => {
  it('renders with placeholder when no value', () => {
    render(<DateInput value="" onChange={jest.fn()} />)

    expect(screen.getByText('Select date')).toBeOnTheScreen()
  })

  it('renders with custom placeholder', () => {
    render(<DateInput value="" onChange={jest.fn()} placeholder="Pick a date" />)

    expect(screen.getByText('Pick a date')).toBeOnTheScreen()
  })

  it('renders formatted date when value is provided', () => {
    render(<DateInput value="2024-01-15" onChange={jest.fn()} />)

    expect(screen.getByText('15 Jan 2024')).toBeOnTheScreen()
  })

  it('opens date picker when pressed', async () => {
    render(<DateInput value="" onChange={jest.fn()} />)

    await userEvent.press(screen.getByText('Select date'))
    expect(screen.getByText('Select date')).toBeOnTheScreen()
  })
})
