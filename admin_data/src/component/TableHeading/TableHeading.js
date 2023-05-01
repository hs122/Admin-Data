export const TableHeading = ({ check, setCheck }) => {
    return (
      <>
       <th>
              <input
                type="checkbox"
                checked={check}
                onChange={() => {
                  setCheck(!check);
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
