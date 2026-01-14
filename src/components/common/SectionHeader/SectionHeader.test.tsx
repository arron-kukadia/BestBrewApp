import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { SectionHeader } from './index';

describe('SectionHeader', () => {
  it('renders title text', () => {
    render(<SectionHeader title="Recent Activity" />);
    expect(screen.getByText('Recent Activity')).toBeOnTheScreen();
  });

  it('renders action text when provided', () => {
    render(<SectionHeader title="Activity" actionText="See all" onActionPress={() => {}} />);
    expect(screen.getByText('See all')).toBeOnTheScreen();
  });

  it('does not render action when actionText is not provided', () => {
    render(<SectionHeader title="Activity" />);
    expect(screen.queryByText('See all')).not.toBeOnTheScreen();
  });

  it('calls onActionPress when action is pressed', async () => {
    const onActionPressMock = jest.fn();
    render(
      <SectionHeader title="Activity" actionText="See all" onActionPress={onActionPressMock} />
    );

    await userEvent.press(screen.getByText('See all'));
    expect(onActionPressMock).toHaveBeenCalledTimes(1);
  });
});
