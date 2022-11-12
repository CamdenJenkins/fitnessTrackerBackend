import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoutines, deleteRoutine, getRoutineById } from "../api/routines";
import styles from "../styles/SingleRoutine.module.css";

const SingleRoutineView = () => {
  const { routineId } = useParams();

  const [singleRoutine, setSingleRoutine] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const findRoutineById = async () => {
      const routine = await getRoutineById(routineId);
      setSingleRoutine(routine);
      console.log(singleRoutine);
    };
    findRoutineById();
  }, []);

  const deleteRoutineById = async () => {
    const result = await deleteRoutine(singleRoutine.id);
    console.log(singleRoutine.id);
    navigate("/routines");
  };

  console.log(singleRoutine);

  return (
    <div className={styles.routinesPage} key={singleRoutine.id}>
      <div className={styles.routineCard}>
        <h3 className={styles.creator}>
          Created By: {singleRoutine.creatorName}
        </h3>
        <h2 className={styles.header}>Muscle Group: {singleRoutine.name}</h2>
        <p className={styles.body}>Goal: {singleRoutine.goal}</p>
        {singleRoutine.activities ? (
          <p className={styles.activities}>
            Activities:{" "}
            {singleRoutine.activities.map((activity) => {
              return (
                <p>
                  {activity.name}: {activity.description}
                </p>
              );
            })}
          </p>
        ) : null}

        <button
          id={styles.button}
          className="pure-button pure-button-primary"
          onClick={deleteRoutineById}
        >
          Delete
        </button>
        <button
          id={styles.button}
          className="pure-button pure-button-primary"
          onClick={() => {
            navigate(`/edit/routines/${routineId}`);
          }}
        >
          Edit Routine
        </button>
      </div>
    </div>
  );
};

export default SingleRoutineView;
