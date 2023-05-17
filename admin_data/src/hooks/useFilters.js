const useFilters = (search, allDetails) => {

  const filteredItem = search ?allDetails?.filter((items) => {
    return (
      items?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
      items?.email?.toLowerCase().includes(search.toLowerCase()) ||
      items?.role?.toLowerCase()?.includes(search.toLowerCase())
    );
  }):allDetails;
  return filteredItem;
};

export default useFilters;
