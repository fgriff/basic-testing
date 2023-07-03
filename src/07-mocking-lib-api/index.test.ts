// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const lodash = jest.requireActual('lodash');

  return {
    ...lodash,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const POSTS_URL = '/posts';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() => Promise.resolve({ data: POSTS_URL }));
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(POSTS_URL);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(POSTS_URL);
    expect(mock.get).toHaveBeenCalledWith(POSTS_URL);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(POSTS_URL);
    const result = await throttledGetDataFromApi(POSTS_URL);
    expect(result).toEqual(POSTS_URL);
  });
});
