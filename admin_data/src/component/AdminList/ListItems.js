export const ListItems = ({ task }) => {
    return (
      <>
        <td data-cell="Name">{task.name}</td>
        <td data-cell="Email">{task.email}</td>
        <td data-cell="Role"> {task.role && task.role.charAt(0).toUpperCase() + task.role.slice(1)}</td>
      </>
    );
  };
