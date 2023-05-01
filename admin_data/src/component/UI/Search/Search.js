export const Search = ({ data, handlerClick }) => {
    return (
      <>
        <input
          type="text"
          placeholder="Search"
          value={data}
          onChange={handlerClick}
          className="input"
        />
      </>
    );
  };