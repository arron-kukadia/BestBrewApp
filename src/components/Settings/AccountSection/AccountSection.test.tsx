import React from 'react';
import { render, screen } from '@/test-utils';
import { AccountSection } from './index';
import { useAuthStore } from '@/stores/authStore';

jest.mock('@/stores/authStore');

describe('AccountSection', () => {
  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { email: 'test@example.com' },
      })
    );
  });

  it('renders account section title', () => {
    render(<AccountSection />);
    expect(screen.getByText('Account')).toBeOnTheScreen();
  });

  it('displays user email', () => {
    render(<AccountSection />);
    expect(screen.getByText('test@example.com')).toBeOnTheScreen();
  });
});
