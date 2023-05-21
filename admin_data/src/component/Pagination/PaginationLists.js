export const PaginationLists = ({ pageCount, handlePage }) => {
  return (
    <>
      {[...Array(pageCount)].map((_, i) => {
        return (
          <button onClick={() => handlePage(i + 1)} className="page page-btn" key={i}>
            {i + 1}
          </button>
        );
      })}
    </>
  );
};
