import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { PaginationLists } from '../component/Pagination/PaginationLists';

describe('PaginationLists component', () => {
  const pageCount = 5;
  const handlePage = jest.fn();

  it('renders the correct number of page buttons', () => {
   render(<PaginationLists pageCount={pageCount} handlePage={handlePage} />);
    const pageButtons = screen.getAllByRole('button', { className: 'page page-btn' });
    expect(pageButtons.length).toBe(pageCount);
  });

  it('calls handlePage function with the correct page number when a button is clicked', () => {
  render(<PaginationLists pageCount={pageCount} handlePage={handlePage} />);
    const pageButton = screen.getByText('1');
    fireEvent.click(pageButton);
    expect(handlePage).toHaveBeenCalledWith(1);
  });
});
