
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../SignIn';


jest.mock('antd', () => ({
  Input: (props, ref) => <input {...props} ref={ref} />,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe('SignIn Component', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });


  it('renders welcome message when user is logged in', () => {
    localStorage.setItem('userName', 'John');
    render(<SignIn onSucess={mockOnSuccess} />);
    expect(screen.getByText('Hi John, click next to continue')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls onSuccess when Next button is clicked for logged in user', () => {
    localStorage.setItem('userName', 'John');
    render(<SignIn onSucess={mockOnSuccess} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });

    fireEvent.click(nextButton);

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('matches snapshot when user is logged in', () => {
    localStorage.setItem('userName', 'John');
    const { asFragment } = render(<SignIn onSucess={mockOnSuccess} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
