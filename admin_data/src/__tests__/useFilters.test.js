import useFilters from "../hooks/useFilters";

describe('useFilters', () => {
  test('should return all details when search is empty', () => {
    const allDetails = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    const search = '';
    const filteredItems = useFilters(search, allDetails);
    expect(filteredItems).toEqual(allDetails);
  });

  test('should filter items based on search term', () => {
    const allDetails = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    const search = 'john';
    const filteredItems = useFilters(search, allDetails);
    const expectedItems = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    ];
    expect(filteredItems).toEqual(expectedItems);
  });

  test('should be case-insensitive when filtering', () => {
    const allDetails = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    const search = 'JOHN';
    const filteredItems = useFilters(search, allDetails);
    const expectedItems = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    ];
    expect(filteredItems).toEqual(expectedItems);
  });

  test('should filter items by name, email, and role', () => {
    const allDetails = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    const search = 'smith';
    const filteredItems = useFilters(search, allDetails);
    const expectedItems = [
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    expect(filteredItems).toEqual(expectedItems);
  });

  test('should return an empty array when no matching items found', () => {
    const allDetails = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ];
    const search = 'foo';
    const filteredItems = useFilters(search, allDetails);
    expect(filteredItems).toEqual([]);
  });

  test('should return an empty array when allDetails is empty', () => {
    const allDetails = [];
    const search = 'john';
    const filteredItems = useFilters(search, allDetails);
    expect(filteredItems).toEqual([]);
  });
});
