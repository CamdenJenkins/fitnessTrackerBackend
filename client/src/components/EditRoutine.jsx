import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById, editRoutine } from "../api/routines";
import { editCountDuration } from "../api/routine_activities";

export default function EditRoutine() {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState();
  const { routineId } = useParams();
  const [is_public, setIs_public] = useState(true);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ is_public, name, goal });
          const result = await editRoutine(is_public, name, goal, routineId);

          console.log(result);
          navigate("/");
        }}
      >
        <h3>Edit the Routine</h3>
        <label>Muscle Group: </label>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>

        <label>Goal: </label>
        <input
          value={goal}
          type="text"
          placeholder="goal"
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        />
        <label>Is Public: </label>
        <input
          checked={is_public}
          type="checkbox"
          onChange={() => {
            setIs_public(!is_public);
          }}
        ></input>
        <button type="submit">Update </button>
      </form>
    </div>
  );
}
