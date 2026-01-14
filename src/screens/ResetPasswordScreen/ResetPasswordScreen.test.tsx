import React from 'react';
import { Alert } from 'react-native';
import { render, screen, waitFor, userEvent } from '@/test-utils';
import { ResetPasswordScreen } from './index';
import { authService } from '@/services/authService';

jest.mock('@/services/authService');
jest.spyOn(Alert, 'alert');

describe('ResetPasswordScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );
    expect(screen.getByText('Create New Password')).toBeOnTheScreen();
  });

  it('displays the email in subtitle', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );
    expect(screen.getByText(/test@example.com/)).toBeOnTheScreen();
  });

  it('renders verification code input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );
    expect(screen.getByPlaceholderText('Verification Code')).toBeOnTheScreen();
  });

  it('renders new password input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );
    expect(screen.getByPlaceholderText('New Password')).toBeOnTheScreen();
  });

  it('renders confirm password input', () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );
    expect(screen.getByPlaceholderText('Confirm New Password')).toBeOnTheScreen();
  });

  it('calls onBack when back button is pressed', async () => {
    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );

    await userEvent.press(screen.getByTestId('back-button'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls authService.confirmResetPassword when form is submitted with valid data', async () => {
    (authService.confirmResetPassword as jest.Mock).mockResolvedValue({});

    render(
      <ResetPasswordScreen email="test@example.com" onBack={mockOnBack} onSuccess={mockOnSuccess} />
    );

    await userEvent.type(screen.getByPlaceholderText('Verification Code'), '123456');
    await userEvent.type(screen.getByPlaceholderText('New Password'), 'newpassword123');
    await userEvent.type(screen.getByPlaceholderText('Confirm New Password'), 'newpassword123');
    await userEvent.press(screen.getByText('Reset Password'));

    await waitFor(() => {
      expect(authService.confirmResetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        code: '123456',
        newPassword: 'newpassword123',
      });
    });
  });
});
