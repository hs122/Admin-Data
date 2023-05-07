import { useFetch } from "../../../hooks/useFetch";

export const Button = ({OnIsCheck, handleDeleteAll, OnSetIsCheck}) => {
  const{sliceData} = useFetch()

    return (

        <button
          className="btn-All"
          disabled={!OnIsCheck}
          onClick={() => {
            handleDeleteAll(sliceData?.length);
            OnSetIsCheck(false);
          }}
        >
          <span className="text">Delete All</span>
        </button>

    );
  };