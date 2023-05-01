import { useRef } from "react";
import AdminList from "../../AdminList/AdminList";
import { ListItems } from "../../AdminList/ListItems";

export const ListAction = ({ onChange, task, isEditing, setIsEditing }) => {
  const refName = useRef();

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
          <input ref={refName} onChange={(e) => {}} />
        </td>
        <td>
          <input ref={refName} onChange={(e) => {}} />
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
          <img onClick={() => setIsEditing(true)}  alt="edit" />
        </td>
      </>
    );
  }

  return <>{taskContent}</>;
};
