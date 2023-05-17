import { useFetch } from "../../../hooks/useFetch";

export const Button = ({OnIsCheck, handleDeleteAll, OnSetIsCheck}) => {
  const{sliceData} = useFetch()

    return (

        <button
          className="btn-All"
          disabled={!OnIsCheck}
          data-testid="delete"
          onClick={() => {
            handleDeleteAll(sliceData?.length);
            OnSetIsCheck(false);
          }}
        >
          DELETE ALL
        </button>

    );
  };