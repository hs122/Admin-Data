import { useState, useEffect, useCallback,useMemo } from "react";
import { ADMIN_FETCH_API } from "../constant";
import useFilters from "./useFilters";


export const useFetch = (search) => {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPerPage = 10;
  const filters = useFilters

  const sliceData = useMemo(() => {

    let usersDetails = users;

    if (search) {
      usersDetails = filters(search, allUsers);
    }


    // Current Page slice
    return usersDetails.slice(
      (number - 1) * totalPerPage,
      (number - 1) * totalPerPage + totalPerPage
    );
  }, [users, number, search, totalPerPage, filters,allUsers]);



  const getUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(ADMIN_FETCH_API);
      if (!response?.ok) {
        const errorResponse = {
          status: response?.status,
          message: "Something went wrong",
        };
        throw errorResponse;
      }
      const json = await response.json();
      setUsers(json);
      setAllUsers(json);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  return {
    users,
    setUsers,
    allUsers,
    isLoading,
    error,
    sliceData,
    setNumber,
    number,
    setAllUsers,
   totalPerPage
  };
};
