// login.test.js
import { describe, it, expect, vi } from 'vitest';
import instance from '../../axios-instance'; // Mock this instance
import {getUser} from "../../user/get-user"
import type { IUserResponse } from "@/infrastructure/user/user.types";

// Mock the axios instance
vi.mock('../../axios-instance', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('login function', () => {
  it('should successfully login and return user data', async () => {
    // Define the mock request payload and response
    const mockResponse: IUserResponse = { 
        email: 'testuser@gmail.com', 
        uuid: 'someuuid', 
        name: 'testuseremail' 
    };

    // Set up axios instance to return a resolved promise with the mock response
    vi.mocked(instance.get).mockResolvedValue({data: { data: mockResponse }});

    // Call the login function
    const result = await getUser();

    // Check that the instance was called with the correct URL and payload
    expect(instance.get).toHaveBeenCalledWith('/me');

    // Verify the function returns the correct data
    expect(result).toEqual(mockResponse);
  });
});
