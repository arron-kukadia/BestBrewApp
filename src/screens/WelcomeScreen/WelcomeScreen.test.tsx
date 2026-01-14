import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { WelcomeScreen } from './index';

describe('WelcomeScreen', () => {
  const mockNavigateToLogin = jest.fn();
  const mockNavigateToRegister = jest.fn();

  beforeEach(() => {
    mockNavigateToLogin.mockClear();
    mockNavigateToRegister.mockClear();
  });

  it('renders brand name', () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );
    expect(screen.getByText('BestBrew')).toBeOnTheScreen();
  });

  it('renders headline', () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );
    expect(screen.getByText('Your Personal Coffee Journey')).toBeOnTheScreen();
  });

  it('renders sign in button', () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );
    expect(screen.getByText('Sign In')).toBeOnTheScreen();
  });

  it('renders create account button', () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );
    expect(screen.getByText('Create Account')).toBeOnTheScreen();
  });

  it('calls onNavigateToLogin when Sign In is pressed', async () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );

    await userEvent.press(screen.getByText('Sign In'));
    expect(mockNavigateToLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onNavigateToRegister when Create Account is pressed', async () => {
    render(
      <WelcomeScreen
        onNavigateToLogin={mockNavigateToLogin}
        onNavigateToRegister={mockNavigateToRegister}
      />
    );

    await userEvent.press(screen.getByText('Create Account'));
    expect(mockNavigateToRegister).toHaveBeenCalledTimes(1);
  });
});
