import React from 'react';
import { render, screen } from '@/test-utils';
import { StatCard } from './index';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard icon="coffee" label="Total Brews" value={42} />);
    expect(screen.getByText('Total Brews')).toBeOnTheScreen();
    expect(screen.getByText('42')).toBeOnTheScreen();
  });

  it('renders string values', () => {
    render(<StatCard icon="star" label="Rating" value="-" />);
    expect(screen.getByText('Rating')).toBeOnTheScreen();
    expect(screen.getByText('-')).toBeOnTheScreen();
  });
});
