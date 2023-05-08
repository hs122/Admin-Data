import React, { useState } from "react";
import { Search } from "../UI/Search/Search";
import { TableHeading } from "../TableHeading/TableHeading";
import AdminList from "../AdminList/AdminList";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
import useFilters from "../../hooks/useFilters";

import { Button } from "../UI/Button/Button";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const { users, setUsers, allUsers, error, sliceData, setNumber, isLoading } = useFetch();

  const filter = useFilters;

  const handleClick = (e) => {
    if (e?.target?.value) {
      const searchData = filter(e.target.value, allUsers);
      setUsers(searchData);
    }
    setSearch(e.target.value);
  };

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

  if (!isLoading) {
    <p>Loading....</p>;
  }
  if (error) {
    <p>Error...</p>;
  }
  return (
    <>
      <section>
        <Search search={search} handlerClick={handleClick} />
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
