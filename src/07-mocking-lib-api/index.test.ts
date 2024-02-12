import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');
const relativePath = '/placeholder/';
const mockData = { data: { result: 'success' } };
describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue({ data: mockData });
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to the correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');
    const response = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
    expect(response).toEqual(mockData);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(response).toEqual(mockData);
  });
});
