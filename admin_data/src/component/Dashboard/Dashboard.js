import React, { useState} from "react";

import { TableHeading } from "../TableHeading/TableHeading";
import AdminList from "../AdminList/AdminList";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";

import ErrorHandling from "../ErrorHandling.js/ErrorHandling";
import { Button } from "../UI/Button/Button";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const { users, setUsers, error, isLoading, sliceData, setNumber } =useFetch(search);


  function handleEdit(task) {
    setUsers(users.map((e) => (task?.id === e?.id ? task : e)));
  }
  function handlerDelete(taskId) {
    setUsers(users.filter((e) => e.id !== taskId));
  }
  const pageNumber = (pages) => {
    setNumber(pages);
  };
  const handleCheckBox = (check) => {
    setIsCheck(check);
  };

  const handleDeleteAll = (d) => {
    setUsers(users?.slice(d));
  };

  if (error) {
 return <ErrorHandling error={error}/>
  }
if(isLoading){
  return <div>No data found</div>
}
if (!users.length) {
  return <div data-cell="no-users">No users found</div>;
}
  return (
    <>
      <section>
      <label>
        <input
          type="text"
          placeholder="Search by name,email or role"
          value={search}
          onChange={(e) => {setSearch(e.target.value)
          setNumber(1)}}

          />
      </label>
        <table>
          <thead>
            <tr>
              <TableHeading isCheck={isCheck} setIsCheck={setIsCheck} />
            </tr>
          </thead>
          <tbody>
            {sliceData?.map((data) => {
              return (
                <AdminList
                  key={data.id}
                  task={data}
                  onDelete={handlerDelete}
                  onChange={handleEdit}
                  onCheck={isCheck}
                  onCheckAll={handleCheckBox}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <div className="pagination">
          <Button
            handleDeleteAll={handleDeleteAll}
            OnIsCheck={isCheck}
            OnSetIsCheck={setIsCheck}

          />
          <Pagination
            pageNumber={pageNumber}
            search={search}
            length={sliceData}
          />
        </div>
      </section>
    </>
  );

};

export default Dashboard;
