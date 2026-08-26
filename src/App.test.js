import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Secure Print Link title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Secure Print Link/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
