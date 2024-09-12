// login.test.js
import { describe, it, expect, vi } from 'vitest';
import instance from '../../axios-instance'; // Mock this instance
import { login } from '../../auth/login'; // Adjust the path according to your file structure
import type { IAuthLoginRequest, IAuthResponse } from '@/infrastructure/auth/auth.types';

// Mock the axios instance
vi.mock('../../axios-instance', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('login function', () => {
  it('should successfully login and return user data', async () => {
    // Define the mock request payload and response
    const requestPayload: IAuthLoginRequest = { email: 'testuser@gmail.com', password: 'password123' };
    const mockResponse: IAuthResponse = { 
      accessToken: 'token asdas', 
      refreshToken: 'token asdasdasd', 
      user: {
        email: 'testuser@gmail.com', 
        uuid: 'someuuid', 
        name: 'testuseremail' 
      }
    };

    // Set up axios instance to return a resolved promise with the mock response
    vi.mocked(instance.post).mockResolvedValue({ data: mockResponse });

    // Call the login function
    const result = await login(requestPayload);

    // Check that the instance was called with the correct URL and payload
    expect(instance.post).toHaveBeenCalledWith('/auth/login', requestPayload);

    // Verify the function returns the correct data
    expect(result).toEqual(mockResponse);
  });

  it('should handle login errors and return the correct error message', async () => {
    // Define the mock request payload and error response
    const requestPayload: IAuthLoginRequest = { email: 'testuser@gmail.com', password: 'password123' };
    const mockError = { response: { data: { message: 'Validation error' } } };

    // Set up axios instance to return a rejected promise
    vi.mocked(instance.post).mockRejectedValue(mockError);

    // Use try-catch to handle the error thrown by the login function
    try {
      await login(requestPayload);
    } catch (error) {
      // Check that the instance was called with the correct URL and payload
      expect(instance.post).toHaveBeenCalledWith('/auth/login', requestPayload);

      // Verify the correct error message is returned
      expect(error).toBe('Validation error');
    }
  });
});
