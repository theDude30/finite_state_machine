
import React from 'react';
import {render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('antd/es/layout/layout', () => ({
    Content: ({ children }) => <div data-testid="mock-content">{children}</div>,
    Footer: ({ children }) => <div data-testid="mock-footer">{children}</div>,
    Header: ({ children }) => <div data-testid="mock-header">{children}</div>
  }));

  jest.mock('antd', () => ({
    ConfigProvider: ({ children }) => <div data-testid="mock-config-provider">{children}</div>,
    Flex: ({ children }) => <div data-testid="mock-flex">{children}</div>,
    Layout: ({ children }) => <div data-testid="mock-layout">{children}</div>,
    Modal: ({ children, open, onCancel }) => open ? (
      <div data-testid="mock-modal">
        {children}
        <button onClick={onCancel}>Close Modal</button>
      </div>
    ) : null
  }));

  jest.mock('../../components/AppHeader', () => ({ signIn }) => (
    <div data-testid="mock-app-header">
      Mock AppHeader
      <button onClick={signIn}>Sign In</button>
    </div>
  ));
  jest.mock('../../components/Product', () => ({ onBidButtonClick }) => (
    <div data-testid="mock-product">
      Mock Product
      <button onClick={onBidButtonClick}>Bid</button>
    </div>
  ));
  jest.mock('../../components/AppFooter', () => () => <div data-testid="mock-app-footer">Mock AppFooter</div>);
  jest.mock('../../components/BiddingModal', () => ({ onClose }) => (
    <div data-testid="mock-bidding-modal">
      Mock BiddingModal
      <button onClick={onClose}>Close</button>
    </div>
  ));
  jest.mock('../../components/SignIn', () => ({ onSuccess }) => (
    <div data-testid="mock-sign-in">
      Mock SignIn
      <button onClick={onSuccess}>Sign In Success</button>
    </div>
  ));

  jest.mock('../../mocks/mockProduct', () => ({
    MOCK_PRODUCT: { id: '1', name: 'Mock Product' }
  }));


import App from '../App';


describe('App Component', () => {
    it('renders without crashing', () => {
      render(<App />);
      expect(screen.getByTestId('mock-app-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-product')).toBeInTheDocument();
      expect(screen.getByTestId('mock-app-footer')).toBeInTheDocument();
    });

    it('opens the BiddingModal when bid button is clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByText('Bid'));
      expect(screen.getByTestId('mock-bidding-modal')).toBeInTheDocument();
    });

    it('closes the BiddingModal when close button is clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByText('Bid'));
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('mock-bidding-modal')).not.toBeInTheDocument();
    });

    it('opens the SignIn modal when sign in is clicked', async () => {
      render(<App />);
      fireEvent.click(screen.getByText('Sign In'));
      await waitFor(()=> {
        expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
        expect(screen.getByTestId('mock-sign-in')).toBeInTheDocument();
      })
    });

    it('closes the SignIn modal when sign in is successful', () => {
      render(<App />);
      fireEvent.click(screen.getByText('Sign In'));
      expect(screen.getByTestId('mock-modal')).toBeInTheDocument();

    });

    it('matches snapshot', () => {
      const { asFragment } = render(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
