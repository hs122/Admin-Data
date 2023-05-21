export const ListItems = ({ task }) => {
    return (
      <>
        <td data-cell="Name" data-testid="name-cell">{task.name}</td>
        <td data-cell="Email" data-testid="email-cell">{task.email}</td>
        <td data-cell="Role" data-testid="role-cell"> {task.role && task.role.charAt(0).toUpperCase() + task.role.slice(1)}</td>
      </>
    );
  };
