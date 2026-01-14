import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { Button } from './index';

describe('Button', () => {
  it('renders the title text', () => {
    render(<Button title="Click me" onPress={() => {}} />);
    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();
    render(<Button title="Click me" onPress={onPressMock} />);

    await userEvent.press(screen.getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPressMock = jest.fn();
    render(<Button title="Click me" onPress={onPressMock} disabled />);

    await userEvent.press(screen.getByText('Click me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<Button title="Click me" onPress={() => {}} isLoading />);
    expect(screen.queryByText('Click me')).not.toBeOnTheScreen();
  });

  it('is disabled when loading', () => {
    const onPressMock = jest.fn();
    render(<Button title="Click me" onPress={onPressMock} isLoading />);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    const icon = <></>;
    render(<Button title="With Icon" onPress={() => {}} icon={icon} />);
    expect(screen.getByText('With Icon')).toBeOnTheScreen();
  });
});
