import { render, renderHook,fireEvent,screen} from "@testing-library/react";
import { useFetch } from "./hooks/useFetch";
import { Button } from "./component/UI/Button/Button";
import React from 'react';
import Dashboard from "./component/Dashboard/Dashboard";
import AdminList from "./component/AdminList/AdminList";



describe("useFetch", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, name: "John", email: "john@example.com", role: "manager" },
            { id: 2, name: "Jane", email: "jane@example.com", role: "manager" },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch and set users on mount", async () => {
    const { result, waitFor } = renderHook(() => useFetch());

    expect(result.current.isLoading).toBe(true);
    await waitFor();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual([
      { id: 1, name: "John", email: "john@example.com", role: "manager" },
      { id: 2, name: "Jane", email: "jane@example.com", role: "manager" },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("ADMIN_FETCH_API");
  });

  it("should set error state when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch failed"))
    );
    const { result, waitFor } = renderHook(() => useFetch());

    expect(result.current.isLoading).toBe(true);
    await waitFor();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Fetch failed");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("ADMIN_FETCH_API");
  });

  it("should slice the data based on number state", async () => {
    const { result,waitFor} = renderHook(() => useFetch());

    await waitFor();
    expect(result.current.sliceData).toEqual([ { id: 1, name: "John", email: "john@example.com", role: "manager" }
    ]);
    result.current.setNumber(2);
    expect(result.current.sliceData).toEqual([{ id: 2, name: "Jane", email: "jane@example.com", role: "manager" }]);
  });
});


describe('Button', () => {
  const handleDeleteAll = jest.fn();
  const OnSetIsCheck = jest.fn();

  it('should render a button with the text "Delete All"', () => {
   render(
      <Button OnIsCheck={true} handleDeleteAll={handleDeleteAll} OnSetIsCheck={OnSetIsCheck} />
    );

    expect(screen.getByText('Delete All')).toBeInTheDocument();
  });

  it('should disable the button when OnIsCheck is false', () => {
    render(
      <Button OnIsCheck={false} handleDeleteAll={handleDeleteAll} OnSetIsCheck={OnSetIsCheck} />
    );

    expect(screen.getByText('Delete All')).toBeDisabled();
  });

  it('should call handleDeleteAll and OnSetIsCheck when the button is clicked', () => {
    render(
      <Button OnIsCheck={true} handleDeleteAll={handleDeleteAll} OnSetIsCheck={OnSetIsCheck} />
    );

    fireEvent.click(screen.getByText('Delete All'));

    expect(handleDeleteAll).toHaveBeenCalledTimes(1);
    expect(handleDeleteAll).toHaveBeenCalledWith(0);
    expect(OnSetIsCheck).toHaveBeenCalledTimes(1);
    expect(OnSetIsCheck).toHaveBeenCalledWith(false);
  });
});



describe('Dashboard', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: 'John', email: 'john@example.com' },
            { id: 2, name: 'Jane', email: 'jane@example.com' },
            { id: 3, name: 'Joe', email: 'joe@example.com' },
          ]),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders search input', () => {
    render(<Dashboard />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  test('renders user list', async () => {
    render(<Dashboard />);
    const userList = await screen.findAllByTestId('user-list-item');
    expect(userList).toHaveLength(3);
  });

  test('search input filters user list', async () => {
    render(<Dashboard />);
    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'jane' } });
    const userList = await screen.findAllByTestId('user-list-item');
    expect(userList).toHaveLength(1);
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('edit button updates user data', async () => {
    render(<Dashboard />);
    const editButton = await screen.findByTestId('edit-button-2');
    fireEvent.click(editButton);
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(nameInput, { target: { value: 'Janet' } });
    fireEvent.change(emailInput, { target: { value: 'janet@example.com' } });
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    const updatedUser = await screen.findByText('Janet');
    expect(updatedUser).toBeInTheDocument();
    expect(screen.getByText('janet@example.com')).toBeInTheDocument();
  });

  test('delete button removes user data', async () => {
    render(<Dashboard />);
    const deleteButton = await screen.findByTestId('delete-button-2');
    fireEvent.click(deleteButton);
    const userList = await screen.findAllByTestId('user-list-item');
    expect(userList).toHaveLength(2);
    expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument();
  });
});

describe("AdminList", () => {
  const task = {
    id: 1,
    name: "Task 1",
    description: "Description of Task 1",
    status: "pending",
  };
  const onDelete = jest.fn();
  const onChange = jest.fn();
  const onCheckAll = jest.fn();

  it("renders the component with the correct props", () => {
   render(
      <AdminList
        task={task}
        onDelete={onDelete}
        onChange={onChange}
        onCheckAll={onCheckAll}
        onCheck={false}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description of Task 1")).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked", () => {
    render(
      <AdminList
        task={task}
        onDelete={onDelete}
        onChange={onChange}
        onCheckAll={onCheckAll}
        onCheck={false}
      />
    );

    fireEvent.click(screen.getByLabelText("Delete"));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onChange when the edit button is clicked", () => {
    render(
      <AdminList
        task={task}
        onDelete={onDelete}
        onChange={onChange}
        onCheckAll={onCheckAll}
        onCheck={false}
      />
    );

    fireEvent.click(screen.getByLabelText("Edit"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(task);
  });

  it("calls onCheckAll when the checkbox is checked", () => {
  render(
      <AdminList
        task={task}
        onDelete={onDelete}
        onChange={onChange}
        onCheckAll={onCheckAll}
        onCheck={false}
      />
    );

    fireEvent.click(screen.getByLabelText("Select"));

    expect(onCheckAll).toHaveBeenCalledTimes(1);
    expect(onCheckAll).toHaveBeenCalledWith(true);
  });

  it("sets the isActive state to true when onCheck prop is true", () => {
  render(
      <AdminList
        task={task}
        onDelete={onDelete}
        onChange={onChange}
        onCheckAll={onCheckAll}
        onCheck={true}
      />
    );

    expect(screen.getByLabelText("Select")).toBeChecked();
  });
});