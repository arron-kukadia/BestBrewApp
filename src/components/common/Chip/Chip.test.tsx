import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { Chip } from './index';

describe('Chip', () => {
  it('renders label text', () => {
    render(<Chip label="Light Roast" />);
    expect(screen.getByText('Light Roast')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();
    render(<Chip label="Filter" onPress={onPressMock} />);

    await userEvent.press(screen.getByText('Filter'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when selected', () => {
    render(<Chip label="Selected" selected />);
    expect(screen.getByText('Selected')).toBeOnTheScreen();
  });
});
