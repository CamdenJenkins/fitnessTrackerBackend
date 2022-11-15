import DropdownButton from "react-bootstrap/DropdownButton";
import useActivities from "../hooks/useActivities";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { addRoutineActivity } from "../api/routine_activities";
import { useState } from "react";

const DropDownForm = () => {
  const { activities } = useActivities();
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <form>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {activities.map((activity) => {
          console.log(activity);
          return (
            <DropdownItem
              onClick={async () => {
                console.log(routine);
                const result = await addRoutineActivity(
                  routine.id,
                  activity.id,
                  activity.count,
                  activity.duration
                );
                console.log(
                  "routineId: ",
                  routine.id,
                  "activityId",
                  activity.id
                );
                // routine.activities.push(activity);
                console.log(result);
              }}
            >
              {activity.name} {activity.count} {activity.duration}
            </DropdownItem>
          );
        })}
      </DropdownButton>
    </form>
  );
};

export default DropDownForm;
