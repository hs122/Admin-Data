export const Search = ({ search, handlerClick}) => {
    return (
      <label>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handlerClick}
          />
      </label>
    );
  };