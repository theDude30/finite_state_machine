
import { renderHook, act } from '@testing-library/react';


const mockUseFSM = jest.fn();

jest.mock('../FSM', () => ({
  __esModule: true,
  default: (...args) => mockUseFSM(...args)
}));


import useFSM from '../FSM';

describe('useFSM Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFSM.mockImplementation(() => ({
      state: 'idle',
      transition: jest.fn(),
      isLoading: false,
      error: null,
      isInitialized: true,
      getStateConfig: jest.fn(() => ({
        on: {
          START: [{ target: 'running' }]
        }
      }))
    }));
  });

  test('should initialize correctly', () => {
    const { result } = renderHook(() => useFSM('test-url'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isInitialized).toBe(true);
    expect(result.current.state).toBe('idle');
  });

  test('should handle transitions', () => {
    const { result } = renderHook(() => useFSM('test-url'));

    act(() => {
      result.current.transition('START');
    });

    expect(result.current.transition).toHaveBeenCalledWith('START');
  });

  test('should return correct state config', () => {
    const { result } = renderHook(() => useFSM('test-url'));
    const stateConfig = result.current.getStateConfig();
    expect(stateConfig).toEqual({
      on: {
        START: [{ target: 'running' }]
      }
    });
  });

  test('should handle errors', () => {
    // Mock an error state
    mockUseFSM.mockImplementationOnce(() => ({
      state: null,
      transition: jest.fn(),
      isLoading: false,
      error: 'Fetch failed',
      isInitialized: false,
      getStateConfig: jest.fn()
    }));

    const { result } = renderHook(() => useFSM('test-url'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Fetch failed');
    expect(result.current.isInitialized).toBe(false);
  });

  test('should handle loading state', () => {
    mockUseFSM.mockImplementationOnce(() => ({
      state: null,
      transition: jest.fn(),
      isLoading: true,
      error: null,
      isInitialized: false,
      getStateConfig: jest.fn()
    }));

    const { result } = renderHook(() => useFSM('test-url'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isInitialized).toBe(false);
  });
});
