import React from 'react';
import { render,screen } from '@testing-library/react';
import { ListItems } from '../component/AdminList/ListItems';

describe('ListItems component', () => {
  const task = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'admin',
  };

  it('renders the task name', () => {
    render(<ListItems task={task} />);
    const nameCell = screen.getByTestId('name-cell');
    expect(nameCell.textContent).toBe('John Doe');
  });

  it('renders the task email', () => {
   render(<ListItems task={task} />);
    const emailCell = screen.getByTestId('email-cell');
    expect(emailCell.textContent).toBe('johndoe@example.com');
  });


});
