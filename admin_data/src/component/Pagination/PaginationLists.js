export const PaginationLists = ({ pageCount, handlerPage }) => {
    return (

      <>
        {[...Array(pageCount)].map((_, i) => {
          return (
            <li key={i}>
            <span onClick={() => handlerPage(i + 1)}
            >
              {i + 1}
            </span>
            </li>
          );
        })}
      </>

    );
  };
