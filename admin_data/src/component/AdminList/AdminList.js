import { useState, useEffect } from "react";
import { ListAction } from "../UI/Action/ListAction";

const AdminList = ({ task, onDelete, onChange, onCheck, onCheckAll }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (onCheck) {
      setIsActive(true);
    } else {
      setIsActive(false);
      onCheckAll(false);
    }
  }, [onCheck, onCheckAll]);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => {
            setIsActive(e.target.checked);
          }}
        />
      </td>

      <ListAction
        onChange={onChange}
        task={task}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isActive={isActive}
        setIsActive={setIsActive}
        onDelete={onDelete}
      />



    </tr>
  );
};
export default AdminList;
