import React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { EmptyState } from './index';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState icon="coffee" title="No coffees yet" description="Add your first coffee" />);
    expect(screen.getByText('No coffees yet')).toBeOnTheScreen();
    expect(screen.getByText('Add your first coffee')).toBeOnTheScreen();
  });

  it('renders action button when actionLabel and onAction are provided', () => {
    const onActionMock = jest.fn();
    render(
      <EmptyState
        icon="coffee"
        title="Empty"
        description="Description"
        actionLabel="Add Coffee"
        onAction={onActionMock}
      />
    );
    expect(screen.getByText('Add Coffee')).toBeOnTheScreen();
  });

  it('calls onAction when action button is pressed', async () => {
    const onActionMock = jest.fn();
    render(
      <EmptyState
        icon="coffee"
        title="Empty"
        description="Description"
        actionLabel="Add Coffee"
        onAction={onActionMock}
      />
    );

    await userEvent.press(screen.getByText('Add Coffee'));
    expect(onActionMock).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when actionLabel is not provided', () => {
    render(<EmptyState icon="coffee" title="Empty" description="Description" />);
    expect(screen.queryByText('Add Coffee')).not.toBeOnTheScreen();
  });
});
