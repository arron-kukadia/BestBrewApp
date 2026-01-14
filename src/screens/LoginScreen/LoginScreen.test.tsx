import React from 'react';
import { render, screen, waitFor, userEvent } from '@/test-utils';
import { LoginScreen } from './index';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

jest.mock('@/services/authService');
jest.mock('@/stores/authStore');

describe('LoginScreen', () => {
  const mockNavigateToRegister = jest.fn();
  const mockNavigateToForgotPassword = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setUser: mockSetUser,
      })
    );
  });

  it('renders email input', () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen();
  });

  it('renders password input', () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen();
  });

  it('renders sign in button', () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );
    expect(screen.getByText('Sign In')).toBeOnTheScreen();
  });

  it('renders forgot password link', () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );
    expect(screen.getByText('Forgot Password?')).toBeOnTheScreen();
  });

  it('calls onNavigateToForgotPassword when forgot password is pressed', async () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );

    await userEvent.press(screen.getByText('Forgot Password?'));
    expect(mockNavigateToForgotPassword).toHaveBeenCalledTimes(1);
  });

  it('calls onNavigateToRegister when sign up is pressed', async () => {
    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );

    await userEvent.press(screen.getByText('Sign up'));
    expect(mockNavigateToRegister).toHaveBeenCalledTimes(1);
  });

  it('calls authService.signIn when form is submitted with valid data', async () => {
    (authService.signIn as jest.Mock).mockResolvedValue({});
    (authService.getCurrentUser as jest.Mock).mockResolvedValue({ userId: '123' });
    (authService.getUserAttributes as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    render(
      <LoginScreen
        onNavigateToRegister={mockNavigateToRegister}
        onNavigateToForgotPassword={mockNavigateToForgotPassword}
      />
    );

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
