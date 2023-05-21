import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import Pagination from '../component/Pagination/Pagination';

describe('Pagination component', () => {
  const search = 'example';
  const pageNumber = jest.fn();

  it('should call pageNumber with the selected page number', () => {
   render(
      <Pagination search={search} pageNumber={pageNumber} />
    );

    const startPageButton = screen.getByText('Start');
    fireEvent.click(startPageButton);
    expect(pageNumber).toHaveBeenCalledWith(1);

    const prevPageButton = screen.getByText('Prev');
    fireEvent.click(prevPageButton);
    expect(pageNumber).toHaveBeenCalledWith(-1); // Update with the expected value

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
    expect(pageNumber).toHaveBeenCalledWith(2); // Update with the expected value

    const endPageButton = screen.getByText('End');
    fireEvent.click(endPageButton);
    expect(pageNumber).toHaveBeenCalledWith(-2); // Update with the expected value
  });
});
