export const PaginationLists = ({ pageCount, handlerPage }) => {
    return (

      <>
        {[...Array(pageCount)].map((_, i) => {
          return (
            <li>
            <a onClick={() => handlerPage(i + 1)}
            key={i}>
              {i + 1}
            </a>
            </li>
          );
        })}
      </>

    );
  };
