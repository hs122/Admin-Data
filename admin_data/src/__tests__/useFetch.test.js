import { renderHook, act } from '@testing-library/react-hooks';
import { useFetch } from '../hooks/useFetch';



describe('useFetch', () => {
  beforeEach(() => {
    // Mock the fetch function or API endpoint if needed
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            // Sample user data
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
          ]),
      })
    );
  });

  afterEach(() => {
    // Restore the original fetch function
    window.fetch.mockRestore();
  });

  test('should initialize with correct initial state', () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.users).toEqual([]);
    expect(result.current.number).toBe(1);
    expect(result.current.allUsers).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.sliceData).toEqual([]);
    expect(result.current.totalPerPage).toBe(10);
  });

  test('should fetch users and update state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.users).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]);
    expect(result.current.allUsers).toEqual([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
