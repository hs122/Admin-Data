import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the Dashboard component', () => {
    render(<App />);
    const dashboardElement = screen.getByTestId('dashboard');
    expect(dashboardElement).toBeInTheDocument();
  });


});
