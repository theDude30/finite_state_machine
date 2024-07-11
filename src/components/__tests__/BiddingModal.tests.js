
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BiddingModal from '../BiddingModal';

// Mock the child components
jest.mock('../SignIn', () => ({ onSuccess }) => (
  <div data-testid="sign-in">
    SignIn Component
    <button onClick={onSuccess}>Sign In</button>
  </div>
));
jest.mock('../AddPaymentMethod', () => ({ onSuccess }) => (
  <div data-testid="add-payment-method">
    AddPaymentMethod Component
    <button onClick={onSuccess}>Add Payment</button>
  </div>
));
jest.mock('../PlaceBidForm', () => ({ onSubmit }) => (
  <div data-testid="place-bid-form">
    PlaceBidForm Component
    <button onClick={onSubmit}>Place Bid</button>
  </div>
));
jest.mock('../BidProcessSteps', () => ({ currentState }) => (
  <div data-testid="bid-process-steps">BidProcessSteps: {currentState}</div>
));
jest.mock('../BidAccepted', () => () => <div data-testid="bid-accepted">Bid Accepted</div>);

// Mock the useFSM hook
const mockUseFSM = jest.fn();
jest.mock('../../library/FSM', () => ({
  __esModule: true,
  default: (...args) => mockUseFSM(...args)
}));

// Mock antd Modal
jest.mock('antd', () => ({
  Modal: ({ children, ...props }) => (
    <div data-testid="mock-modal" {...props}>
      {children}
    </div>
  ),
}));

describe('BiddingModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockUseFSM.mockReturnValue({
      state: 'idle',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });
  });

  it('renders correctly in idle state', async () => {
    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
      expect(screen.getByTestId('bid-process-steps')).toBeInTheDocument();
    });
  });

  it('transitions to checkingLogin state', async () => {
    mockUseFSM.mockReturnValue({
      state: 'checkingLogin',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });

    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Checking Login ...')).toBeInTheDocument();
    });
  });

  it('renders SignIn component in login state', async () => {
    mockUseFSM.mockReturnValue({
      state: 'login',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });

    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    });
  });

  it('renders AddPaymentMethod component in addPaymentMethod state', async () => {
    mockUseFSM.mockReturnValue({
      state: 'addPaymentMethod',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });

    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('add-payment-method')).toBeInTheDocument();
    });
  });

  it('renders PlaceBidForm component in placeBid state', async () => {
    mockUseFSM.mockReturnValue({
      state: 'placeBid',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });

    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('place-bid-form')).toBeInTheDocument();
    });
  });

  it('renders BidAccepted component in bidAccepted state', async () => {
    mockUseFSM.mockReturnValue({
      state: 'bidAccepted',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      getStateConfig: jest.fn(() => ({})),
      isInitialized: true
    });

    render(<BiddingModal onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('bid-accepted')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BiddingModal onClose={mockOnClose} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
