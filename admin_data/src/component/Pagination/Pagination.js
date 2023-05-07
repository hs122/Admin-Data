import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLists } from "./PaginationLists";
import { RightArrow } from "../../assest/svg/RightArrow";
import { DoubleRightArrow } from "../../assest/svg/DoubleRightArrow";
import { LeftArrow } from "../../assest/svg/LeftArrow";
import { DoubleLeftArrow } from "../../assest/svg/DoubleLeftArrow";

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
  );
  useEffect(() => {
    props.pageNumber(currentPages);
  }, [props, currentPages]);
  return (
    <div className="pagination">
      <button className="btn-All text">Delete All</button>
      <div className="pagination-container">
        <ul>
          <li>
            <span onClick={() => handlerPage(1)}>
              <DoubleLeftArrow />
            </span>
          </li>
          <li>
            <span onClick={() => handlerPage(currentPages - 1)}>
              <LeftArrow />
            </span>
          </li>

          {users.length > 0 && (
            <PaginationLists handlerPage={handlerPage} pageCount={pageCount} />
          )}
          <li>
            <span onClick={() => handlerPage(currentPages + 1)}>
              <RightArrow />
            </span>
          </li>
          <li>
            <span onClick={() => handlerPage(pageCount)}>
              <DoubleRightArrow />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
