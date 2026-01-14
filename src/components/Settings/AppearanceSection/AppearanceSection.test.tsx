import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { AppearanceSection } from './index';
import { useTheme } from '@/hooks/useTheme';

jest.mock('@/hooks/useTheme');

const mockSetMode = jest.fn();

describe('AppearanceSection', () => {
  beforeEach(() => {
    mockSetMode.mockClear();
    (useTheme as jest.Mock).mockReturnValue({
      mode: 'system',
      setMode: mockSetMode,
      colors: {
        text: '#000',
        textSecondary: '#666',
        primary: '#0D9488',
        surface: '#fff',
        surfaceVariant: '#f5f5f5',
        primaryLight: '#CCFBF1',
      },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
      borderRadius: { sm: 8, md: 12, lg: 16 },
      typography: {
        bodySmMedium: { fontSize: 14 },
      },
    });
  });

  it('renders appearance section title', () => {
    render(<AppearanceSection />);
    expect(screen.getByText('Appearance')).toBeOnTheScreen();
  });

  it('renders all theme options', () => {
    render(<AppearanceSection />);
    expect(screen.getByText('System')).toBeOnTheScreen();
    expect(screen.getByText('Light')).toBeOnTheScreen();
    expect(screen.getByText('Dark')).toBeOnTheScreen();
  });

  it('calls setMode when theme option is pressed', async () => {
    render(<AppearanceSection />);

    await userEvent.press(screen.getByText('Light'));
    expect(mockSetMode).toHaveBeenCalledWith('light');

    await userEvent.press(screen.getByText('Dark'));
    expect(mockSetMode).toHaveBeenCalledWith('dark');
  });
});
