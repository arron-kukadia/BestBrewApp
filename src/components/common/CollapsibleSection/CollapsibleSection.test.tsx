import React from 'react'
import { Text } from 'react-native'
import { render, screen, userEvent } from '@/test-utils'
import { CollapsibleSection } from './index'

describe('CollapsibleSection', () => {
  it('renders title', () => {
    render(
      <CollapsibleSection title="Additional Details">
        <Text>Content</Text>
      </CollapsibleSection>
    )

    expect(screen.getByText('Additional Details')).toBeOnTheScreen()
  })

  it('hides content by default', () => {
    render(
      <CollapsibleSection title="Details">
        <Text>Hidden Content</Text>
      </CollapsibleSection>
    )

    expect(screen.queryByText('Hidden Content')).not.toBeOnTheScreen()
  })

  it('shows content when defaultExpanded is true', () => {
    render(
      <CollapsibleSection title="Details" defaultExpanded>
        <Text>Visible Content</Text>
      </CollapsibleSection>
    )

    expect(screen.getByText('Visible Content')).toBeOnTheScreen()
  })

  it('toggles content visibility when header is pressed', async () => {
    render(
      <CollapsibleSection title="Toggle Section">
        <Text>Toggleable Content</Text>
      </CollapsibleSection>
    )

    expect(screen.queryByText('Toggleable Content')).not.toBeOnTheScreen()

    await userEvent.press(screen.getByText('Toggle Section'))
    expect(screen.getByText('Toggleable Content')).toBeOnTheScreen()

    await userEvent.press(screen.getByText('Toggle Section'))
    expect(screen.queryByText('Toggleable Content')).not.toBeOnTheScreen()
  })
})
