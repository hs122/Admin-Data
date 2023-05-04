import { render, screen } from '@testing-library/react';
import App from './App';
import Dashboard from './component/Dashboard/Dashboard';
import { useFetch } from './hooks/useFetch';

test('renders learn react link', () => {
  render(<Dashboard/>);
})
test('renders learn react links', () => {
  render(<useFetch/>);
})