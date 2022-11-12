import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivityById } from "../api/activities";
import styles from "../styles/SingleActivity.module.css";

const SingleActivityView = () => {
  const { activityId } = useParams();

  const [singleActivity, setSingleActivity] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const findActivityById = async () => {
      const activity = await getActivityById(activityId);
      setSingleActivity(activity);
      console.log(singleActivity);
    };
    findActivityById();
  }, []);

  console.log(singleActivity);

  return (
    <div className={styles.routinesPage} key={singleActivity.id}>
      <div className={styles.routineCard}>
        <h2 className={styles.header}>Excercise: {singleActivity.name}</h2>
        <p className={styles.body}>Goal: {singleActivity.description}</p>

        <button
          id={styles.button}
          className="pure-button pure-button-primary"
          onClick={() => {
            navigate(`/edit/activities/${activityId}`);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SingleActivityView;
