import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.filter);

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
    </div>
  );
};

export default VisibilityFilter;
