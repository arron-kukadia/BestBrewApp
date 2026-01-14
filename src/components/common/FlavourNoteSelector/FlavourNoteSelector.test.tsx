import React from 'react'
import { render, screen, userEvent } from '@/test-utils'
import { FlavourNoteSelector } from './index'
import { FlavourNote } from '@/types'

const options = ['Fruity', 'Nutty', 'Chocolate']

describe('FlavourNoteSelector', () => {
  it('renders all options', () => {
    render(
      <FlavourNoteSelector
        options={options}
        selectedNotes={[]}
        onToggle={() => {}}
        onIntensityChange={() => {}}
      />
    )
    expect(screen.getByText('Fruity')).toBeOnTheScreen()
    expect(screen.getByText('Nutty')).toBeOnTheScreen()
    expect(screen.getByText('Chocolate')).toBeOnTheScreen()
  })

  it('calls onToggle when option is pressed', async () => {
    const onToggleMock = jest.fn()
    render(
      <FlavourNoteSelector
        options={options}
        selectedNotes={[]}
        onToggle={onToggleMock}
        onIntensityChange={() => {}}
      />
    )

    await userEvent.press(screen.getByText('Fruity'))
    expect(onToggleMock).toHaveBeenCalledWith('Fruity')
  })

  it('shows intensity selector for selected notes', () => {
    const selectedNotes: FlavourNote[] = [{ name: 'Fruity', intensity: 2 }]
    render(
      <FlavourNoteSelector
        options={options}
        selectedNotes={selectedNotes}
        onToggle={() => {}}
        onIntensityChange={() => {}}
      />
    )

    expect(screen.getByText('1')).toBeOnTheScreen()
    expect(screen.getByText('2')).toBeOnTheScreen()
    expect(screen.getByText('3')).toBeOnTheScreen()
  })

  it('calls onIntensityChange when intensity is selected', async () => {
    const onIntensityChangeMock = jest.fn()
    const selectedNotes: FlavourNote[] = [{ name: 'Fruity', intensity: 2 }]
    render(
      <FlavourNoteSelector
        options={options}
        selectedNotes={selectedNotes}
        onToggle={() => {}}
        onIntensityChange={onIntensityChangeMock}
      />
    )

    await userEvent.press(screen.getByText('3'))
    expect(onIntensityChangeMock).toHaveBeenCalledWith('Fruity', 3)
  })
})
