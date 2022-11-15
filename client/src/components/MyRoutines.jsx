import React, { useEffect } from "react";
import useRoutines from "../hooks/useRoutines";
import { fetchRoutines } from "../api/routines";
import styles from "../styles/Routines.module.css";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useActivities from "../hooks/useActivities";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { addRoutineActivity } from "../api/routine_activities";

export default function MyRoutines() {
  const { user } = useUsers();
  const { activities } = useActivities();
  const { routines, setRoutines } = useRoutines();
  const navigate = useNavigate();
  useEffect(() => {
    const recieveRoutines = async () => {
      const display = await fetchRoutines();
      setRoutines(display);
      console.log(display);
      console.log(activities);
    };
    recieveRoutines();
  }, []);

  return (
    <div>
      {routines.map((routine) => {
        console.log(routine);
        console.log(user.username);
        return (
          <>
            {routine.creatorName === user.username ? (
              <div className={styles.routinesPage} key={routine.id}>
                <div className={styles.routineCard}>
                  <h3 className={styles.creator}>
                    Created By: {routine.creatorName}
                  </h3>
                  <h6 className={styles.header}>{routine.name}</h6>
                  <p className={styles.body}>{routine.goal}</p>
                  <p className={styles.activities}>
                    <p className={styles.activities}>
                      Activities:{" "}
                      {routine.activities.map((activity) => {
                        return (
                          <>
                            <p>
                              {activity.name}: {activity.description}
                              <p>Count: {activity.count}</p>
                              <p>Duration: {activity.duration}</p>
                            </p>
                          </>
                        );
                      })}
                    </p>
                  </p>
                  <button
                    id={styles.button}
                    className="pure-button pure-button-primary"
                    onClick={() => {
                      navigate(`/routines/${routine.id}`);
                    }}
                  >
                    See Details
                  </button>
                  <form>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Add Activity"
                    >
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
                </div>
              </div>
            ) : null}
          </>
        );
      })}
      <div className={styles.createBar}>
        <button
          className="pure-button pure-button-primary"
          id={styles.createroutine}
          onClick={() => {
            navigate("/makeroutine");
          }}
        >
          Create Routine
        </button>

        <button
          className="pure-button pure-button-primary"
          id={styles.createactivity}
          onClick={() => {
            navigate("/makeactivity");
          }}
        >
          Create Activity
        </button>
      </div>
    </div>
  );
}
