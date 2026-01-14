import React from 'react';
import { render, screen, waitFor, userEvent } from '@/test-utils';
import { ForgotPasswordScreen } from './index';
import { authService } from '@/services/authService';

jest.mock('@/services/authService');

describe('ForgotPasswordScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnCodeSent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />);
    expect(screen.getByText('Reset Password')).toBeOnTheScreen();
  });

  it('renders email input', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />);
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen();
  });

  it('renders send reset code button', () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />);
    expect(screen.getByText('Send Reset Code')).toBeOnTheScreen();
  });

  it('calls onBack when back button is pressed', async () => {
    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />);

    await userEvent.press(screen.getByTestId('back-button'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls authService.resetPassword and onCodeSent when form is submitted', async () => {
    (authService.resetPassword as jest.Mock).mockResolvedValue({});

    render(<ForgotPasswordScreen onBack={mockOnBack} onCodeSent={mockOnCodeSent} />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.press(screen.getByText('Send Reset Code'));

    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockOnCodeSent).toHaveBeenCalledWith('test@example.com');
    });
  });
});
