// Unit tests for: CreateAccount

import axios from 'axios';
import {API_KEY, BASE_URL} from '../../constants/utils';
import {CreateAccount} from '../api';

jest.mock('axios');

describe('CreateAccount() CreateAccount method', () => {
  const mockPayload = {username: 'testuser', password: 'testpass'};
  const mockResponse = {data: {id: 1, username: 'testuser'}};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('should successfully create an account with valid payload', async () => {
      // Arrange: Mock axios post to resolve with mockResponse
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      // Act: Call CreateAccount with mockPayload
      const result = await CreateAccount(mockPayload);

      // Assert: Verify the result matches the mockResponse data
      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        `${BASE_URL}register`,
        mockPayload,
        {headers: {'X-API-KEY': API_KEY}},
      );
    });
  });

  describe('Edge Cases', () => {
    it('should throw an error if axios post fails', async () => {
      // Arrange: Mock axios post to reject with an error
      const errorMessage = 'Network Error';
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: Expect CreateAccount to throw an error
      await expect(CreateAccount(mockPayload)).rejects.toThrow(errorMessage);
    });

    it('should handle empty payload gracefully', async () => {
      // Arrange: Mock axios post to resolve with mockResponse
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      // Act: Call CreateAccount with an empty payload
      const result = await CreateAccount({});

      // Assert: Verify the result matches the mockResponse data
      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        `${BASE_URL}register`,
        {},
        {headers: {'X-API-KEY': API_KEY}},
      );
    });

    it('should handle unexpected response structure', async () => {
      // Arrange: Mock axios post to resolve with an unexpected response structure
      const unexpectedResponse = {unexpectedKey: 'unexpectedValue'};
      (axios.post as jest.Mock).mockResolvedValue(unexpectedResponse);

      // Act: Call CreateAccount with mockPayload
      const result = await CreateAccount(mockPayload);

      // Assert: Verify the result is undefined due to unexpected response structure
      expect(result).toBeUndefined();
    });
  });
});

// End of unit tests for: CreateAccount
