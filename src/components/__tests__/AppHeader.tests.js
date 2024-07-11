

import React from 'react';
import { render } from '@testing-library/react';


jest.mock('antd', () => ({
  Divider: () => <hr data-testid="mock-divider" />,
}));

const localStorageMock = (function() {
    let store = {};
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

import AppHeader from '../AppHeader';


describe('AppHeader Component', () => {
        const mockSignIn = jest.fn();

        beforeEach(() => {
          jest.clearAllMocks();
          localStorage.clear();
        });

        it('matches snapshot when user is not signed in', () => {
          const { asFragment } = render(<AppHeader signIn={mockSignIn} />);
          expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when user is signed in', () => {
          localStorage.setItem('userName', 'John Doe');
          const { asFragment } = render(<AppHeader signIn={mockSignIn} />);
          expect(asFragment()).toMatchSnapshot();
        });
    });
