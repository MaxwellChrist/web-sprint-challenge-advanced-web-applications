// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react'
import { rerender, render, screen } from '@testing-library/react'
import Spinner from './Spinner';
import '@testing-library/jest-dom/extend-expect'

test('Import spinner and test it renders correctly', () => {
  const {rerender} = render(<Spinner on={true} />);
  let message = screen.queryByText(/please wait.../i);
  expect(message).toBeInTheDocument();
  rerender(<Spinner on={false} />);
  expect(message).not.toBeInTheDocument();
})