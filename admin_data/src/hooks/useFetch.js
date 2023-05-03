import { useState, useEffect, useCallback } from "react"

export const useFetch = () => {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const[isLoading,setIsLoading] = useState(false)
  const[error,setError] = useState(null)

  const sliceData = users.slice(number * 10 - 10, number * 10);

  const getUsers = useCallback(async() => {
    setIsLoading(true)
    setError(null)
    try{
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if(!response.ok){
        throw new Error('Something went wrong')
      }
      const json = await response.json();
   setUsers(json);
   setAllUsers(json);
    }
    catch (error){
   setError(error.message)
    }
    setIsLoading(false)

  },[])
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return { users,setUsers,allUsers,isLoading,error,sliceData,setNumber,number};
};