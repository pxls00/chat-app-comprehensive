import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce'; // Adjust the path according to your file structure

describe('debounce function', () => {
  it('should call the function after the specified delay', () => {
    // Use fake timers to control time
    vi.useFakeTimers();

    // Create a mock function to be debounced
    const func = vi.fn();
    const debouncedFunc = debounce(func, 500); // debounce with 500ms delay

    // Call the debounced function
    debouncedFunc();

    // Check that the function is not called immediately
    expect(func).not.toHaveBeenCalled();

    // Fast forward time by 500ms
    vi.advanceTimersByTime(500);

    // Check that the function has been called once
    expect(func).toHaveBeenCalledOnce();

    // Reset the fake timers
    vi.useRealTimers();
  });

  it('should only call the function once if called multiple times within the delay', () => {
    vi.useFakeTimers();

    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);

    // Call the debounced function multiple times within the delay period
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // Fast forward time by just under the debounce delay
    vi.advanceTimersByTime(400);

    // Function should still not have been called
    expect(func).not.toHaveBeenCalled();

    // Fast forward to complete the delay period
    vi.advanceTimersByTime(100);

    // Function should now have been called once
    expect(func).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  it('should reset the delay if called again within the delay period', () => {
    vi.useFakeTimers();

    const func = vi.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc();
    vi.advanceTimersByTime(400);

    // Call the function again, resetting the delay
    debouncedFunc();
    vi.advanceTimersByTime(400);

    // The function should still not have been called
    expect(func).not.toHaveBeenCalled();

    // Fast forward past the new delay period
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });
});
