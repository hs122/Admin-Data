import React from 'react';
import { render,screen } from '@testing-library/react';
import ErrorHandling from '../component/ErrorHandling.js/ErrorHandling';

describe('ErrorHandling', () => {
  test('should render error status and message', () => {
    const error = {
      status: 404,
      message: 'Not Found',
    };

   render(<ErrorHandling error={error} />);

    expect(screen.getByText('Sorry, there was an error:')).toBeInTheDocument();
    expect(screen.getByText('Status: 404')).toBeInTheDocument();
    expect(screen.getByText('Message: Not Found')).toBeInTheDocument();
  });

  test('should render custom error message', () => {
    const error = {
      status: 500,
      message: 'Internal Server Error',
    };

   render(<ErrorHandling error={error} />);

    expect(screen.getByText('Sorry, there was an error:')).toBeInTheDocument();
    expect(screen.getByText('Status: 500')).toBeInTheDocument();
    expect(screen.getByText('Message: Internal Server Error')).toBeInTheDocument();
  });
});
