const useFilters = (search, allDetails) => {
    const filteredItem = allDetails.filter((items) => {
      return (
        items?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
        items?.email?.toLowerCase().includes(search.toLowerCase()) ||
        items?.role?.toLowerCase()?.includes(search.toLowerCase())
      );
    });
    return filteredItem;
  };

  export default useFilters;