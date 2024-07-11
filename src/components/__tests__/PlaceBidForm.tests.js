
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


jest.mock('antd', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Input: (props) => <input {...props} />
}));


import PlaceBidForm from '../PlaceBidForm';

describe('PlaceBidForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<PlaceBidForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Place Your bid')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your bid')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Place Order' })).toBeInTheDocument();
  });

  it('requires input before submission', () => {
    render(<PlaceBidForm onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText('Enter your bid');

    expect(input).toHaveAttribute('required');
  });

  it('only accepts number input', () => {
    render(<PlaceBidForm onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText('Enter your bid');

    expect(input).toHaveAttribute('type', 'number');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<PlaceBidForm onSubmit={mockOnSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
