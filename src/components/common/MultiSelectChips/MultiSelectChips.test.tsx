import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { MultiSelectChips } from './index'

const options = ['Fruity', 'Nutty', 'Chocolate']

describe('MultiSelectChips', () => {
  it('renders label when provided', () => {
    render(
      <MultiSelectChips
        label="Flavor Notes"
        options={options}
        selectedValues={[]}
        onToggle={() => {}}
      />
    )
    expect(screen.getByText('Flavor Notes')).toBeOnTheScreen()
  })

  it('renders all options', () => {
    render(<MultiSelectChips options={options} selectedValues={[]} onToggle={() => {}} />)
    expect(screen.getByText('Fruity')).toBeOnTheScreen()
    expect(screen.getByText('Nutty')).toBeOnTheScreen()
    expect(screen.getByText('Chocolate')).toBeOnTheScreen()
  })

  it('calls onToggle when option is pressed', async () => {
    const onToggleMock = jest.fn()
    render(<MultiSelectChips options={options} selectedValues={[]} onToggle={onToggleMock} />)

    await userEvent.press(screen.getByText('Fruity'))
    expect(onToggleMock).toHaveBeenCalledWith('Fruity')
  })
})
