import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { TableHeading } from '../component/TableHeading/TableHeading';

describe('TableHeading', () => {
  test('should render table headings correctly', () => {
   render(
      <table>
        <thead>
          <tr>
            <TableHeading isCheck={false} setIsCheck={() => {}} />
          </tr>
        </thead>
      </table>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  test('should toggle the checkbox state on change', () => {
    let isCheck = false;
    const setIsCheck = jest.fn((value) => {
      isCheck = value;
    });

   render(
      <table>
        <thead>
          <tr>
            <TableHeading isCheck={isCheck} setIsCheck={setIsCheck} />
          </tr>
        </thead>
      </table>
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(isCheck).toBe(true);
    expect(setIsCheck).toHaveBeenCalledTimes(1);

    fireEvent.click(checkbox);

    expect(isCheck).toBe(true);
    expect(setIsCheck).toHaveBeenCalledTimes(2);
  });
});
