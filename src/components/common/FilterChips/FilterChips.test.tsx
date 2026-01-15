import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { FilterChips } from './index'

const options = [
  { label: 'Light', value: 'light' },
  { label: 'Medium', value: 'medium' },
  { label: 'Dark', value: 'dark' },
]

describe('FilterChips', () => {
  it('renders all filter options', () => {
    render(<FilterChips options={options} selectedValue={null} onSelect={() => {}} />)
    expect(screen.getByText('Light')).toBeOnTheScreen()
    expect(screen.getByText('Medium')).toBeOnTheScreen()
    expect(screen.getByText('Dark')).toBeOnTheScreen()
  })

  it('calls onSelect with value when option is pressed', async () => {
    const onSelectMock = jest.fn()
    render(<FilterChips options={options} selectedValue={null} onSelect={onSelectMock} />)

    await userEvent.press(screen.getByText('Medium'))
    expect(onSelectMock).toHaveBeenCalledWith('medium')
  })

  it('highlights selected option', () => {
    render(<FilterChips options={options} selectedValue="medium" onSelect={() => {}} />)
    expect(screen.getByText('Medium')).toBeOnTheScreen()
  })
})
