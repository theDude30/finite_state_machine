
import React from 'react';
import { render } from '@testing-library/react';

// Mock the antd Divider component
jest.mock('antd', () => ({
  Divider: () => <hr data-testid="mock-divider" />,
}));

import AppFooter from '../AppFooter';


describe('AppFooter Component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<AppFooter />);

    expect(getByTestId('mock-divider')).toBeInTheDocument();
    expect(getByText('created by tzahi bergman 2024')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AppFooter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
