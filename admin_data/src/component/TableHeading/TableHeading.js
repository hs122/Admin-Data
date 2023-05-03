export const TableHeading = ({ isCheck, setIsCheck }) => {
  return (
    <>
      <th>
        <input
          type="checkbox"
          checked={isCheck}
          onChange={() => {
            setIsCheck(!isCheck);
          }}
        />
      </th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Action</th>
    </>
  );
};
