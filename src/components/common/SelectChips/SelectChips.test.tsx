import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { SelectChips } from './index'

const options = [
  { label: 'Light', value: 'light' },
  { label: 'Medium', value: 'medium' },
  { label: 'Dark', value: 'dark' },
]

describe('SelectChips', () => {
  it('renders label when provided', () => {
    render(
      <SelectChips
        label="Roast Level"
        options={options}
        selectedValue="light"
        onSelect={() => {}}
      />
    )
    expect(screen.getByText('Roast Level')).toBeOnTheScreen()
  })

  it('renders all options', () => {
    render(<SelectChips options={options} selectedValue="light" onSelect={() => {}} />)
    expect(screen.getByText('Light')).toBeOnTheScreen()
    expect(screen.getByText('Medium')).toBeOnTheScreen()
    expect(screen.getByText('Dark')).toBeOnTheScreen()
  })

  it('calls onSelect when option is pressed', async () => {
    const onSelectMock = jest.fn()
    render(<SelectChips options={options} selectedValue="light" onSelect={onSelectMock} />)

    await userEvent.press(screen.getByText('Medium'))
    expect(onSelectMock).toHaveBeenCalledWith('medium')
  })
})
