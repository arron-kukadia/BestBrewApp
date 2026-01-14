import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { BackButton } from './index';

describe('BackButton', () => {
  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();
    render(<BackButton onPress={onPressMock} />);

    await userEvent.press(screen.getByTestId('back-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
