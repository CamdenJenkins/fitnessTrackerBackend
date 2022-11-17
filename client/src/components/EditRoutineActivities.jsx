import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editCountDuration } from "../api/routine_activities";
const EditRoutineActivities = () => {
  const { raId } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ count, duration });
          const result = await editCountDuration(count, duration, raId);
          console.log(result);
          navigate("/routines/myroutines");
        }}
      >
        <h3>Edit Count and Duration</h3>
        <label>Count: </label>
        <input
          value={count}
          type="text"
          placeholder="count"
          onChange={(e) => {
            setCount(+e.target.value);
          }}
        ></input>

        <label>Duration: </label>
        <input
          value={duration}
          type="text"
          placeholder="duration"
          onChange={(e) => {
            setDuration(+e.target.value);
          }}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditRoutineActivities;
