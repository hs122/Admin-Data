import React,{useState} from 'react'
import { Search } from '../UI/Search/Search'
import { TableHeading } from '../TableHeading/TableHeading'
import AdminList from '../AdminList/AdminList'
import { useFetch } from '../hooks/useFetch'

const Dashboard = () => {
  const { details, setDetails} = useFetch();
  const [pageNumber, setPageNumber] = useState(1);


  const sliceData = details.slice(pageNumber* 10 - 10, pageNumber * 10);
  function handlerEdit(task) {
    const newDetails = [...details];
    newDetails(
      details.map((e) => {
        if (task.id === e.id) {
          return task;
        } else {
          return e;
        }
      })
    );
    setDetails(newDetails);
  }
  function handlerDelete(taskId) {
    setDetails(
    details.toSpliced(details.filter(e=>e.id !== taskId))
    );
  }
  return (
  <table>
    <tr>
      <Search/>
    </tr>
    <tr>
     <TableHeading/>
    </tr>
    <tr>
    {sliceData?.map((e) => {
            return (
              <AdminList
                task={e}
                onDelete={handlerDelete}
                onChange={handlerEdit}

                key={e.id}
              />
            );
          })}
    </tr>
  </table>
  )
}

export default Dashboard