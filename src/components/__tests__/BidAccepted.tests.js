
import React from 'react';
import { render } from '@testing-library/react';
import BidAccepted from '../BidAccepted';


jest.mock('react-confetti', () => {
  return function DummyConfetti(props) {
    return <div data-testid="mock-confetti" {...props} />;
  };
});

describe('BidAccepted Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment, getByText, getByTestId } = render(<BidAccepted />);
    expect(getByText('Your bid was accepted!')).toBeInTheDocument();
    expect(getByTestId('mock-confetti')).toBeInTheDocument();


    const confettiElement = getByTestId('mock-confetti');
    expect(confettiElement).toHaveAttribute('width', '1000');
    expect(confettiElement).toHaveAttribute('heifght', '200');

    expect(asFragment()).toMatchSnapshot();
  });
});
