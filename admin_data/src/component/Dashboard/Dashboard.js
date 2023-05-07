import React, { useState } from "react";
import { Search } from "../UI/Search/Search";
import { TableHeading } from "../TableHeading/TableHeading";
import AdminList from "../AdminList/AdminList";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
import useFilters from "../../hooks/useFilters";




const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const { users, setUsers, allUsers, error, sliceData, setNumber} = useFetch();

const filter = useFilters

  const handlerClick = (e) => {
    if (search) {
      const searchData = filter(search, allUsers);
      setUsers(searchData);
    }
    setSearch(e.target.value);
  };

  function handlerEdit(task) {
    setUsers(
      users.map((e) => {
        if (task.id === e.id) {
          return task;
        } else {
          return e;
        }
      })
    );
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

  const handleDeleteAll = (deleteAll) => {
   setUsers(users.splice(deleteAll));
  };
  if (users.length === 0) {
    <p>Loading....</p>;
  }
  if (error) {
    <p>Error...</p>;
  }
  return (
    <>
      <section>
      <Search search={search} handlerClick={handlerClick} />
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
                  onChange={handlerEdit}
                  onCheck={isCheck}
                  onCheckAll={handleCheckBox}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <div>
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
