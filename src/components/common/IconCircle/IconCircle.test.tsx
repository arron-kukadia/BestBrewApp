import React from 'react';
import { render, screen } from '@/test-utils';
import { IconCircle } from './index';

describe('IconCircle', () => {
  it('renders without crashing', () => {
    render(<IconCircle icon="coffee" />);
    expect(screen.getByTestId('icon-circle')).toBeOnTheScreen();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<IconCircle icon="lock" size="small" />);
    expect(screen.getByTestId('icon-circle')).toBeOnTheScreen();

    rerender(<IconCircle icon="lock" size="medium" />);
    expect(screen.getByTestId('icon-circle')).toBeOnTheScreen();

    rerender(<IconCircle icon="lock" size="large" />);
    expect(screen.getByTestId('icon-circle')).toBeOnTheScreen();
  });
});
