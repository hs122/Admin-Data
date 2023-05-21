import {screen,render,fireEvent} from "@testing-library/react"
import AdminList from "../component/AdminList/AdminList";


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
