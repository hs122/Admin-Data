import { useState, useEffect } from "react"

export const useFetch = () => {
  const [details, setDetails] = useState([]);
  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  //API Call
  const getUsers = async () => {
    const data = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const json = await data.json();
    setDetails(json);
    setAllDetails(json);
  }

  return { details, setDetails, allDetails };
};