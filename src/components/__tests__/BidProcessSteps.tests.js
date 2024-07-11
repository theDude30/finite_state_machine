
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BidProcessSteps from '../BidProcessSteps';

// Mock the antd components and icons
jest.mock('antd', () => ({
  Steps: ({ items }) => (
    <div data-testid="mock-steps">
      {items.map((item, index) => (
        <div key={index} data-testid={`step-${index}`}>
          {item.title} - {item.status}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  UserOutlined: () => <span data-testid="user-outlined">UserOutlined</span>,
  LoadingOutlined: () => <span data-testid="loading-outlined">LoadingOutlined</span>,
  SolutionOutlined: () => <span data-testid="solution-outlined">SolutionOutlined</span>,
  DollarOutlined: () => <span data-testid="dollar-outlined">DollarOutlined</span>,
  SmileOutlined: () => <span data-testid="smile-outlined">SmileOutlined</span>,
}));

describe('BidProcessSteps Component', () => {
  it('renders correctly for checkingLogin state', () => {
    render(<BidProcessSteps currentState="checkingLogin" />);
    expect(screen.getByTestId('step-0')).toHaveTextContent('Login - process');
    expect(screen.getByTestId('step-1')).toHaveTextContent('Payment method - wait');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Place bid - wait');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Done - wait');
  });

  it('renders correctly for addPaymentMethod state', () => {
    render(<BidProcessSteps currentState="addPaymentMethod" />);
    expect(screen.getByTestId('step-0')).toHaveTextContent('Login - finish');
    expect(screen.getByTestId('step-1')).toHaveTextContent('Payment method - process');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Place bid - wait');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Done - wait');
  });

  it('renders correctly for placeBid state', () => {
    render(<BidProcessSteps currentState="placeBid" />);
    expect(screen.getByTestId('step-0')).toHaveTextContent('Login - finish');
    expect(screen.getByTestId('step-1')).toHaveTextContent('Payment method - finish');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Place bid - process');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Done - wait');
  });

  it('renders correctly for bidAccepted state', () => {
    render(<BidProcessSteps currentState="bidAccepted" />);
    expect(screen.getByTestId('step-0')).toHaveTextContent('Login - finish');
    expect(screen.getByTestId('step-1')).toHaveTextContent('Payment method - finish');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Place bid - finish');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Done - finish');
  });

  it('renders correctly for unknown state', () => {
    render(<BidProcessSteps currentState="unknownState" />);
    expect(screen.getByTestId('step-0')).toHaveTextContent('Login - wait');
    expect(screen.getByTestId('step-1')).toHaveTextContent('Payment method - wait');
    expect(screen.getByTestId('step-2')).toHaveTextContent('Place bid - wait');
    expect(screen.getByTestId('step-3')).toHaveTextContent('Done - wait');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BidProcessSteps currentState="placeBid" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
