
import { Edit } from "../../../assest/svg/Edit";
import { ListItems } from "../../AdminList/ListItems";
import { Delete } from "../../../assest/svg/Delete";

export const ListAction = ({
  onChange,
  task,
  isEditing,
  setIsEditing,
  onDelete,
}) => {
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <td>
          <input
            data-testid="name-input"
            value={task.name}
            onChange={(e) => {
              onChange({
                ...task,
                name: e.target.value,
              });
            }}
          />
        </td>
        <td>
          <input
            data-testid="email-input"
            value={task.email}
            onChange={(e) => {
              onChange({
                ...task,
                email: e.target.value,
              });
            }}
          />
        </td>
        <td>
          <input
            data-testid="role-input"
            value={task.role}
            onChange={(e) => {
              onChange({
                ...task,
                role: e.target.value,
              });
            }}
          />
        </td>
        <td>
          <button
            data-testid="save-button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </td>
      </>
    );
  } else {
    taskContent = (
      <>
        <ListItems task={task} />
        <td data-cell="Action">
          <button onClick={() => setIsEditing(true)} data-testid="edit-button" className="edit_btn">
            <Edit />
          </button>
          <button
            className="delete-btn"
            data-testid="delete-button"
            onClick={() => {
              onDelete(task.id);
            }}
          >
            <Delete />
          </button>
        </td>
      </>
    );
  }

  return <>{taskContent}</>;
};
