import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoutineActivity } from "../api/routine_activities";
const RoutineActivities = () => {
  const { raId } = useParams();

  const [routineActivities, setRoutineActivities] = useState({});
  useEffect(() => {
    const findRoutineActivityByRoutineId = async () => {
      const ra = await fetchRoutineActivity(raId);
      setRoutineActivities(ra);
      console.log(routineActivities);
    };
    findRoutineActivityByRoutineId();
  }, []);

  console.log(routineActivities);

  return (
    <div key={routineActivities.id}>
      <div></div>
    </div>
  );
};

export default RoutineActivities;
