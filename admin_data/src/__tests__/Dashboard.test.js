import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../component/Dashboard/Dashboard';

describe('Dashboard', () => {
  test('renders the search input field', () => {
    render(<Dashboard />);

    const searchInput = screen.getByPlaceholderText('Search by name,email or role');

    expect(searchInput).toBeInTheDocument();
  });

  test('displays "No users found" when there are no users', async() => {
    render(<Dashboard />);

    const noUsersMessage = screen.getByText('No users found');

    expect(noUsersMessage).toBeInTheDocument();
  });

  test('calls handleDeleteAll when the delete button is clicked', async() => {
    const handleDeleteAll = jest.fn();
    render(<Dashboard handleDeleteAll={handleDeleteAll} />);

    const deleteButton = await screen.findByText('Delete All');
    fireEvent.click(deleteButton);

    expect(handleDeleteAll).toHaveBeenCalledTimes(1);
  });
});
