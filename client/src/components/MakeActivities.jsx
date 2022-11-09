import { useState } from "react";
import { makeActivity } from "../api/activities";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddRoutine.module.css";

const MakeActivities = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.formCard}>
      <form
        className="pure-form pure-form-stacked"
        // className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await makeActivity(name, description);
          navigate("/activities");
        }}
      >
        <h3 className={styles.header}>Create New Activity</h3>
        <div className={styles.attributes}>
          <span>
            <label>Name: </label>
            <input
              value={name}
              type="text"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </span>
          <span className={styles.price}>
            <label>Description: </label>
            <input
              value={description}
              type="text"
              placeholder="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
          </span>
        </div>

        <button className="pure-button pure-button-primary" type="submit">
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default MakeActivities;
