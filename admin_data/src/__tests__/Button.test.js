import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { Button } from '../component/UI/Button/Button';

describe('Button', () => {
  test('should render button with correct text', () => {
   render(
      <Button OnIsCheck={true} handleDeleteAll={() => {}} OnSetIsCheck={() => {}} />
    );

    expect(screen.getByText('DELETE ALL')).toBeInTheDocument();
  });

  test('should call handleDeleteAll and set OnIsCheck to false on button click', () => {
    const handleDeleteAll = jest.fn();
    const OnSetIsCheck = jest.fn();
   render(
      <Button OnIsCheck={true} handleDeleteAll={handleDeleteAll} OnSetIsCheck={OnSetIsCheck} />
    );

    const deleteButton = screen.getByTestId('delete');

    fireEvent.click(deleteButton);

    expect(handleDeleteAll).toHaveBeenCalledTimes(1);
    expect(handleDeleteAll).toHaveBeenCalledWith(expect.any(Number));
    expect(OnSetIsCheck).toHaveBeenCalledTimes(1);
    expect(OnSetIsCheck).toHaveBeenCalledWith(false);
  });

  test('should disable button when OnIsCheck is false', () => {
render(
      <Button OnIsCheck={false} handleDeleteAll={() => {}} OnSetIsCheck={() => {}} />
    );

    const deleteButton = screen.getByTestId('delete');

    expect(deleteButton).toBeDisabled();
  });
});
