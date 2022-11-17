import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteRoutineActivity,
  fetchRoutineActivity,
} from "../api/routine_activities";
import styles from "../styles/SingleRoutine.module.css";
const EditRA = () => {
  const navigate = useNavigate();
  const [routineActivity, setRoutineActivity] = useState({});

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
  console.log(routineActivity.id);
  const deleteRa = async () => {
    const result = await deleteRoutineActivity(routineActivity.id);
    console.log(routineActivity.id);
    navigate("/routines/myroutines");
  };
  return (
    <div className={styles.page}>
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
          <button
            id={styles.button}
            className="pure-button pure-button-primary"
            onClick={deleteRa}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRA;
