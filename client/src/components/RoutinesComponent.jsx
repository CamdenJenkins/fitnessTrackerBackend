import React, { useEffect } from "react";
import useRoutines from "../hooks/useRoutines";
import { fetchRoutines } from "../api/routines";
import styles from "../styles/Routines.module.css";
import { useNavigate } from "react-router-dom";

export default function RoutinesComponent() {
  const { routines, setRoutines } = useRoutines();
  const navigate = useNavigate();
  useEffect(() => {
    const recieveRoutines = async () => {
      const display = await fetchRoutines();
      setRoutines(display);
      console.log(display);
    };
    recieveRoutines();
  }, []);

  // return <div>{JSON.stringify(routines)}</div>;

  return (
    <div>
      {routines.map((routine) => {
        return (
          <div className={styles.routinesPage} key={routine.id}>
            <div className={styles.routineCard}>
              <h3 className={styles.creator}>
                Created By: {routine.creatorName}
              </h3>
              <h6 className={styles.header}>{routine.name}</h6>
              <p className={styles.body}>{routine.goal}</p>
              <p className={styles.activities}>
                {/* Activities: {routine.activities} */}
              </p>
              <button
                id={styles.button}
                className="pure-button pure-button-primary"
                onClick={() => {
                  navigate(`/singleroutine/${routine.id}`);
                }}
              >
                See Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
