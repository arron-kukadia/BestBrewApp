import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { PriceInput } from './index'

describe('PriceInput', () => {
  it('renders with GBP currency symbol', () => {
    render(
      <PriceInput value="" onChangeText={jest.fn()} currency="GBP" onCurrencyChange={jest.fn()} />
    )

    expect(screen.getByText('£')).toBeOnTheScreen()
  })

  it('renders with USD currency symbol', () => {
    render(
      <PriceInput value="" onChangeText={jest.fn()} currency="USD" onCurrencyChange={jest.fn()} />
    )

    expect(screen.getByText('$')).toBeOnTheScreen()
  })

  it('renders with EUR currency symbol', () => {
    render(
      <PriceInput value="" onChangeText={jest.fn()} currency="EUR" onCurrencyChange={jest.fn()} />
    )

    expect(screen.getByText('€')).toBeOnTheScreen()
  })

  it('shows currency picker when currency selector is pressed', async () => {
    render(
      <PriceInput value="" onChangeText={jest.fn()} currency="GBP" onCurrencyChange={jest.fn()} />
    )

    await userEvent.press(screen.getByText('£'))
    expect(screen.getByText('GBP')).toBeOnTheScreen()
    expect(screen.getByText('USD')).toBeOnTheScreen()
    expect(screen.getByText('EUR')).toBeOnTheScreen()
  })

  it('calls onCurrencyChange when currency is selected', async () => {
    const onCurrencyChange = jest.fn()
    render(
      <PriceInput
        value=""
        onChangeText={jest.fn()}
        currency="GBP"
        onCurrencyChange={onCurrencyChange}
      />
    )

    await userEvent.press(screen.getByText('£'))
    await userEvent.press(screen.getByText('USD'))
    expect(onCurrencyChange).toHaveBeenCalledWith('USD')
  })
})
