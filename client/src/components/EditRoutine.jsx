import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById, editRoutine } from "../api/routines";

export default function EditRoutine() {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState();
  const { routineId } = useParams();
  const [is_public, setIs_public] = useState(true);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  //   useEffect(() => {
  //     async function getRoutine() {
  //       const result = await getRoutineById(routineId);
  //       console.log(result);
  //       setRoutine(result);

  //       setIs_public(routine.is_public);
  //       setName(routine.name);
  //       setGoal(routine.goal);
  //     }
  //     getRoutine();
  //   }, []);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ is_public, name, goal });
          const result = await editRoutine(is_public, name, goal, routineId);
          console.log(result);
          navigate("/routines");
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
