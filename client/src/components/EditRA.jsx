import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoutineActivity } from "../api/routine_activities";
const EditRA = () => {
  const navigate = useNavigate();
  const [routineActivityId, setRoutineActivityId] = useState(0);
  const [raStatus, setraStatus] = useState("no ra");
  const { routineId } = useParams();
  const { activityId } = useParams();
  useEffect(() => {
    const getRA = async () => {
      console.log(routineId, activityId);
      const ra = await fetchRoutineActivity(routineId, activityId);

      console.log(ra);
      setRoutineActivityId(ra.id);
    };

    getRA();
  }, []);

  const updateRoutineActivity = (id) => {};

  return (
    <div>
      {/* <div>{ra}</div> */}
      <button
        onClick={() => {
          navigate(`/routine_activities/${routineActivityId}`);
        }}
      >
        edit
      </button>
    </div>
  );
};

export default EditRA;
