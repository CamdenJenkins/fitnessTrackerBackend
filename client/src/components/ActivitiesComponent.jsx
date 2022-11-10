import React, { useEffect } from "react";
import { fetchActivities } from "../api/activities";
import useActivities from "../hooks/useActivities";
import styles from "../styles/activities.module.css";

export default function ActivitiesComponent() {
  const { activities, setActivities } = useActivities();
  console.log(activities);
  useEffect(() => {
    const recieveActivities = async () => {
      const display = await fetchActivities();
      setActivities(display);
      console.log(display);
    };
    recieveActivities();
  }, []);

  return (
    <div>
      {activities.map((activity) => {
        console.log(activity);
        return (
          <div className={styles.routinesPage} key={activity.id}>
            <div className={styles.routineCard}>
              <h2 className={styles.header}>Exercise: {activity.name}</h2>
              <p className={styles.body}>Description: {activity.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
