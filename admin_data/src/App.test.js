import { renderHook, act} from "@testing-library/react-hooks";
import { useFetch } from "./hooks/useFetch";
import {screen,render,fireEvent,waitFor} from "@testing-library/react"
import { Delete } from "./assest/svg/Delete";
import { Edit } from "./assest/svg/Edit";
import AdminList from "./component/AdminList/AdminList";
import Pagination from "./component/Pagination/Pagination";
import { PaginationLists } from "./component/Pagination/PaginationLists";
import { ListAction } from "./component/UI/Action/ListAction";
import Dashboard from "./component/Dashboard/Dashboard";
import { Button } from "./component/UI/Button/Button";


describe("useFetch", () => {
  it("should initialize with empty user array", () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.users).toEqual([]);
  });

  it("should initialize with number 1", () => {
    const { result } = renderHook(() => useFetch());

    expect(result.current.number).toEqual(1);
  });

  it("should update the users when API fetch is successful", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => [{ id: 1, name: "John" }],
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([{ id: 1, name: "John" }]);
  });

  it("should set error message when API fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    expect(result.current.error).toEqual("Something went wrong");
  });

  it("should update the sliceData based on number", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
        { id: 3, name: "Joe" },
        { id: 4, name: "Jack" },
        { id: 5, name: "Jill" },
        { id: 6, name: "Jim" },
        { id: 7, name: "Jake" },
        { id: 8, name: "Josh" },
        { id: 9, name: "Jasmine" },
        { id: 10, name: "Jared" },
        { id: 11, name: "Janet" },
        { id: 12, name: "Jerry" },
      ],
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await waitForNextUpdate();

    act(() => {
      result.current.setNumber(2);
    });

    expect(result.current.sliceData).toEqual([
      { id: 11, name: "Janet" },
      { id: 12, name: "Jerry" },
    ]);
  });
});

it("render icon",async()=>{
  render(<Delete/>)
})

it("render icons",async()=>{
  render(<Edit/>)
})

describe('AdminList', () => {
  const task = {
    id: 1,
    name: 'Task 1',
    email: 'task1@example.com',
    role: 'user',
  };
  const onDelete = jest.fn();
  const onChange = jest.fn();
  const onCheck = jest.fn();
  const onCheckAll = jest.fn();

  it('renders the task name, email, and role', () => {
    render(
      <table>
        <tbody>
          <AdminList
            task={task}
            onDelete={onDelete}
            onChange={onChange}
            onCheck={onCheck}
            onCheckAll={onCheckAll}
          />
        </tbody>
      </table>
    );
const tableElement = screen.getByText('Task 1')
    expect(tableElement).toBeInTheDocument();
    expect(screen.getByText('task1@example.com')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('calls onCheckAll with false when onCheck is not defined', () => {
    render(
      <table>
        <tbody>
          <AdminList
            task={task}
            onDelete={onDelete}
            onChange={onChange}
            onCheckAll={onCheckAll}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onCheckAll).toHaveBeenCalledTimes(1);
    expect(onCheckAll).toHaveBeenCalledWith(false);
  });
});

describe('Pagination component', () => {
  const search = '';
  const pageNumber = jest.fn();

  it('renders without errors', () => {
    render(<Pagination search={search} pageNumber={pageNumber} />);
  });

  it('handles page clicks', () => {
     render(
      <Pagination search={search} pageNumber={pageNumber} />
    );
    const secondPageButton = screen.getByTestId('pagination-container');
    fireEvent.click(secondPageButton);
    expect(pageNumber).toHaveBeenCalledWith(1);
  });
});


describe('PaginationLists component', () => {
  const pageCount = 5;
  const handlePage = jest.fn();

  it('renders the correct number of pages', () => {
    render(
      <PaginationLists pageCount={pageCount} handlePage={handlePage} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles page clicks', () => {
  render(
      <PaginationLists pageCount={pageCount} handlePage={handlePage} />
    );
    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);
    expect(handlePage).toHaveBeenCalledWith(2);
  });
});



test('renders correctly in non-editing mode', () => {
  const task = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Developer',
  };
  render(
    <ListAction task={task} onDelete={() => {}} />
  );
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
  expect(screen.getByText('Developer')).toBeInTheDocument();
  expect(screen.getByTestId('edit-button')).toBeInTheDocument();
  expect(screen.getByTestId('delete-button')).toBeInTheDocument();
});
test('renders correctly in editing mode', () => {
  const task = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Developer',
  };
  render(
    <ListAction task={task} isEditing={true} onChange={() => {}} />
  );
  expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  expect(screen.getByDisplayValue('johndoe@example.com')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Developer')).toBeInTheDocument();
  expect(screen.getByText('Save')).toBeInTheDocument();
});
test('calls onChange prop when inputs are changed in editing mode', () => {
  const task = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Developer',
  };
  const onChange = jest.fn();
 render(
    <ListAction task={task} isEditing={true} onChange={onChange} />
  );
  const nameInput = screen.getByDisplayValue('John Doe');
  const emailInput = screen.getByDisplayValue('johndoe@example.com');
  const roleInput = screen.getByDisplayValue('Developer');
  fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(emailInput, { target: { value: 'janedoe@example.com' } });
  fireEvent.change(roleInput, { target: { value: 'Designer' } });
  expect(onChange).toHaveBeenCalledTimes(3);

});
test('calls onDelete prop when delete button is clicked', () => {
  const task = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Developer',
  };
  const onDelete = jest.fn();
  render(
    <ListAction task={task} onDelete={onDelete} />
  );
  const deleteButton = screen.getByTestId('delete-button');
  fireEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith(1)})




  test('clicking edit button sets isEditing to true', () => {
    const setIsEditing = jest.fn();
    const task = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Developer'
    };
    render(
      <ListAction
        task={task}
        isEditing={false}
        setIsEditing={setIsEditing}
      />
    );
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);
    expect(setIsEditing).toHaveBeenCalledWith(true);
  });

  test('clicking save button sets isEditing to false', async() => {
    const setIsEditing = jest.fn();
    const task = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Developer'
    };
    render(
      <ListAction
        task={task}
        isEditing={false}
        setIsEditing={setIsEditing}
      />
    );
    const saveButton = await waitFor(() => screen.findByTestId('save-button'),{timeout:5000});
    fireEvent.click(saveButton);
    expect(setIsEditing).toHaveBeenCalledTimes(1);
    expect(setIsEditing).toHaveBeenCalledWith(false);
  });



describe("Dashboard", () => {
  const users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ];

  it("should render the search input", () => {
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should display the list of users", () => {
    render(<Dashboard />);
    const user1 = screen.getByText("John");
    const user2 = screen.getByText("Jane");
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  it("should filter the users based on the search query", () => {
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "jane" } });
    const user1 = screen.queryByText("John");
    const user2 = screen.getByText("Jane");
    expect(user1).not.toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  // it("should edit a user", () => {
  //   render(<Dashboard />);
  //   const editButton = screen.getAllByRole("button", { name: "Edit" })[0];
  //   fireEvent.click(editButton);
  //   const nameInput = screen.getByLabelText("Name:");
  //   fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  //   const saveButton = screen.getByRole("button", { name: "Save" });
  //   fireEvent.click(saveButton);
  //   const user = screen.getByText("Jane Doe");
  //   expect(user).toBeInTheDocument();
  // });

  it("should delete a user", () => {
    render(<Dashboard />);
    const deleteButton = screen.getByTestId('delete');
    fireEvent.click(deleteButton);
    const user = screen.queryByText("John");
    expect(user).not.toBeInTheDocument();
  });
});

describe("Button component", () => {
  const mockHandleDeleteAll = jest.fn();
  const mockSetIsCheck = jest.fn();
  const mockSliceData = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];

  beforeEach(() => {
    mockHandleDeleteAll.mockClear();
    mockSetIsCheck.mockClear();
  });

  it("should render the button with text 'Delete All'", () => {
    render(
      <Button
        OnIsCheck={true}
        handleDeleteAll={mockHandleDeleteAll}
        OnSetIsCheck={mockSetIsCheck}
      />
    );
    expect(screen.getByText("Delete All")).toBeInTheDocument();
  });

  it("should be disabled if OnIsCheck is false", () => {
   render(
      <Button
        OnIsCheck={false}
        handleDeleteAll={mockHandleDeleteAll}
        OnSetIsCheck={mockSetIsCheck}
      />
    );
    expect(screen.getByTestId("delete")).toBeDisabled();
  });

  it("should call handleDeleteAll and OnSetIsCheck when clicked", () => {
     render(
      <Button
        OnIsCheck={true}
        handleDeleteAll={mockHandleDeleteAll}
        OnSetIsCheck={mockSetIsCheck}
      />
    );
    fireEvent.click(screen.getByTestId("delete"));
    expect(mockHandleDeleteAll).toHaveBeenCalledTimes(1);
    expect(mockHandleDeleteAll).toHaveBeenCalledWith(mockSliceData.length);
    expect(mockSetIsCheck).toHaveBeenCalledTimes(1);
    expect(mockSetIsCheck).toHaveBeenCalledWith(false);
  });
});





