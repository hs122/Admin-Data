export const ListItems = ({ task }) => {
    return (
      <>
        <td>{task.name}</td>
        <td>{task.email}</td>
        <td>{task.role.charAt(0).toUpperCase() + task.role.slice(1)}</td>
      </>
    );
  };
