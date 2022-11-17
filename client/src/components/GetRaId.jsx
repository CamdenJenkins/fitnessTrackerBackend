import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoutineActivity } from "../api/routine_activities";
import styles from "../styles/SingleRoutine.module.css";
const EditRA = () => {
  const navigate = useNavigate();
  const [routineActivity, setRoutineActivity] = useState({});
  const [raStatus, setraStatus] = useState("no ra");
  const { routineId } = useParams();
  const { activityId } = useParams();
  useEffect(() => {
    const getRA = async () => {
      console.log(routineId, activityId);
      const ra = await fetchRoutineActivity(routineId, activityId);

      console.log(ra);
      setRoutineActivity(ra[0]);
    };

    getRA();
  }, []);
  console.log(routineActivity);
  return (
    <div>
      <div className={styles.routinesPage}>
        <div className={styles.routineCard}>
          <p className={styles.body}>Count: {routineActivity.count}</p>

          <p className={styles.body}>Duration: {routineActivity.duration}</p>
          <button
            id={styles.button}
            className="pure-button pure-button-primary"
            onClick={() => {
              navigate(`/routine_activities/${routineActivity.id}`);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRA;
