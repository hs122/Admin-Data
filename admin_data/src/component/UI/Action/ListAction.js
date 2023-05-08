import { useRef } from "react";
import { Edit } from "../../../assest/svg/Edit";
import { ListItems } from "../../AdminList/ListItems";
import { Delete } from "../../../assest/svg/Delete";

export const ListAction = ({
  onChange,
  task,
  isEditing,
  setIsEditing,
  isActive,
  setIsActive,
  onDelete,
}) => {
  const refName = useRef();
  const refEmail = useRef();
  const refRole = useRef();

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <td>
          <input
            ref={refName}

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
            ref={refEmail}
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
            ref={refRole}
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
        <td>
          <button onClick={() => setIsEditing(true)} data-testid="edit-button">
            <Edit />
          </button>
          <button
            disabled={!isActive}
            data-testid="delete-button"
            onClick={() => {
              onDelete(task.id);
              setIsActive(false);
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
