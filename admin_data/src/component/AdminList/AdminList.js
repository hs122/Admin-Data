import { useState, useEffect } from "react";

import { ListAction } from "../UI/Action/ListAction";
const AdminList = ({ task, onDelete, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isActive, setIsActive] = useState(false);


  return (
    <>
      <tr>
        <td>
          <span>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
            />
          </span>
        </td>

        <ListAction
          onChange={onChange}
          task={task}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <td>
          <button
            disabled={!isActive}
            onClick={() => {
              onDelete(task.id);
              setIsActive(false);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
export default AdminList;
