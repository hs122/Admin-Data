import React, {useEffect} from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationLists } from "./PaginationLists";


const Pagination = ({ search, pageNumber }) => {
  const { users,number,setNumber,totalPerPage } = useFetch();

  const handlePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== number &&
      selectedPage <= pageCount
    ) {
      setNumber(selectedPage);
    }
  };

  const pageCount = Math.ceil(
    users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    ).length / totalPerPage
  );

  useEffect(() => {
    pageNumber(number);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  const paginationButtons = (
   <>
        <button onClick={() => handlePage(1)} className="page-btn start-page">
          Start
        </button>

        <button onClick={() => handlePage(number - 1)} className="page-btn prev-page" >
         Prev
        </button>

      <PaginationLists handlePage={handlePage} pageCount={pageCount} />


        <button onClick={() => handlePage(number+ 1)} className="page-btn next-page">
       Next
        </button>


        <button onClick={() => handlePage(pageCount)} className="page-btn end-page">
         End
        </button>


        </>
  );

  return (
    <div className="pagination-buttons" >
      {users.length > 0 && paginationButtons}
    </div>
  );
};

export default Pagination;
