import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLists } from "./PaginationLists";

const Pagination = (props) => {
  const { users } = useFetch();
  const [currentPages, setCurrentPages] = useState(1);
  const totalPerPage = 10;
  const handlerPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage !== currentPages) {
      setCurrentPages(selectedPage);
    } else {
      setCurrentPages(currentPages - 1);
    }
  };
  const pageCount = Math.ceil(
    users?.filter((user) => {
      if (props.search === "") {
        return users;
      } else if (
        user?.name?.toLowerCase().includes(props.search.toLowerCase())
      ) {
        return user;
      }
      return false;
    }).length / totalPerPage
  )
  useEffect(() => {
    props.pageNumber(currentPages);
  }, [currentPages]);
  return (
    <div className="pagination">
      <button class="btn-All text">Delete All</button>
      <div>
        <ul>
          <li class="paginations">
            <span>prev</span>
          </li>
          <li class="paginations">
          <span>prev</span>
          </li>

          {users.length > 0 && (
            <PaginationLists  handlerPage={handlerPage} />
          )}
          <li class="paginations">
            <a>next</a>
          </li>
          <li class="paginations">
            <a>next</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
