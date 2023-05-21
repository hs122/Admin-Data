import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { ListAction } from '../component/UI/Action/ListAction';

describe('ListAction component', () => {
  const mockTask = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
  };

  it('should render task details in non-edit mode', () => {
   render(
      <ListAction task={mockTask} isEditing={false} />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('should switch to edit mode when edit button is clicked', () => {
    const setIsEditingMock = jest.fn();
   render(
      <ListAction
        task={mockTask}
        isEditing={false}
        setIsEditing={setIsEditingMock}
      />
    );

    fireEvent.click(screen.getByTestId('edit-button'));

    expect(setIsEditingMock).toHaveBeenCalledTimes(1);
    expect(setIsEditingMock).toHaveBeenCalledWith(true);
  });

  it('should call onChange callback when input values are changed in edit mode', () => {
    const onChangeMock = jest.fn();
  render(
      <ListAction
        task={mockTask}
        isEditing={true}
        onChange={onChangeMock}
      />
    );

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByTestId('role-input'), { target: { value: 'User' } });

    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(onChangeMock).toHaveBeenCalledWith({
      ...mockTask,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'User',
    });
  });

  it('should call setIsEditing callback when save button is clicked', () => {
    const setIsEditingMock = jest.fn();
  render(
      <ListAction
        task={mockTask}
        isEditing={true}
        setIsEditing={setIsEditingMock}
      />
    );

    fireEvent.click(screen.getByTestId('save-button'));

    expect(setIsEditingMock).toHaveBeenCalledTimes(1);
    expect(setIsEditingMock).toHaveBeenCalledWith(false);
  });

  it('should call onDelete callback when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
 render(
      <ListAction
        task={mockTask}
        isEditing={false}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByTestId('delete-button'));

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });
});
