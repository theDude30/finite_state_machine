
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from '../Product';

jest.mock('antd', () => ({
  Divider: () => <hr data-testid="mock-divider" />,
  Flex: ({ children }) => <div data-testid="mock-flex">{children}</div>,
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('../../assets/product-image.webp', () => 'mocked-product-image.webp');
jest.mock('../../assets/seller_img.jpeg', () => 'mocked-seller-image.jpeg');

describe('Product Component', () => {
  const mockProduct = {
    title: 'Test Product',
    seller: {
      name: 'Test Seller',
      rating: 4.5,
    },
    price: '$100',
    bidCount: 10,
  };

  const mockOnBidButtonClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    render(<Product product={mockProduct} onBidButtonClick={mockOnBidButtonClick} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Seller')).toBeInTheDocument();
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
    expect(screen.getByText("Seller's other items")).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('10 bids')).toBeInTheDocument();
    expect(screen.getByText('Ends in 3d 9hSaturday, 03:36 AM')).toBeInTheDocument();
  });

  it('renders images correctly', () => {
    render(<Product product={mockProduct} onBidButtonClick={mockOnBidButtonClick} />);

    const productImage = screen.getByAltText('product_img');
    expect(productImage).toHaveAttribute('src', 'mocked-product-image.webp');

    const sellerImage = screen.getByAltText('seller_img');
    expect(sellerImage).toHaveAttribute('src', 'mocked-seller-image.jpeg');
  });

  it('calls onBidButtonClick when Place Bid button is clicked', () => {
    render(<Product product={mockProduct} onBidButtonClick={mockOnBidButtonClick} />);

    const bidButton = screen.getByText('place bid');
    fireEvent.click(bidButton);

    expect(mockOnBidButtonClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Product product={mockProduct} onBidButtonClick={mockOnBidButtonClick} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
