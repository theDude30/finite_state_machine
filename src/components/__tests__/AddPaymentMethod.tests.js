
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


jest.mock('antd', () => {
    const actualAntd = jest.requireActual('antd');
    return {
      ...actualAntd,
      Button: ({ children, htmlType, ...props }) => <button type={htmlType} {...props}>{children}</button>,
      Input: {
        ...actualAntd.Input,
        // eslint-disable-next-line react/display-name
        __esModule: true,
        default: jest.fn().mockImplementation(({ ...props }) => <input {...props} />),
      },
      Select: ({ options, defaultValue, ...props }) => (
        <select defaultValue={defaultValue} {...props}>
          <option value="">{defaultValue}</option>
          {options && options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ),
    };
  });

import AddPaymentMethod from '../AddPaymentMethod';

describe('AddPaymentMethod Component', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AddPaymentMethod onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Enter your payment details to add a new card.')).toBeInTheDocument();
  });

  it('renders all form elements', () => {
    render(<AddPaymentMethod onSuccess={mockOnSuccess} />);
    expect(screen.getByText('card Number')).toBeInTheDocument();
    expect(screen.getByText('Expiration')).toBeInTheDocument();
    expect(screen.getByText('CVV')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Payment' })).toBeInTheDocument();
  });

  it('calls onSuccess when form is submitted', async () => {
    render(<AddPaymentMethod onSuccess={mockOnSuccess} />);


    const cardNumberInput = screen.getByTestId('card-number-input');
    await userEvent.type(cardNumberInput, '1234567890123456');

    const submitButton = screen.getByRole("form");
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('stores card number in localStorage on form submission', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    render(<AddPaymentMethod onSuccess={mockOnSuccess} />);

    const cardNumberInput =  screen.getByTestId('card-number-input');
    await userEvent.type(cardNumberInput, '1234567890123456');

    const submitButton = screen.getByRole("form");
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('hasPayment', '1234567890123456');
    });

    setItemSpy.mockRestore();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AddPaymentMethod onSuccess={mockOnSuccess} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
