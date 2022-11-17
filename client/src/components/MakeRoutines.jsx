import { useState } from "react";
import { makeRoutine } from "../api/routines";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddRoutine.module.css";

const MakeRoutines = () => {
  const navigate = useNavigate();
  const [is_public, setIs_public] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div className={styles.page}>
      <div className={styles.formCard}>
        <form
          className="pure-form pure-form-stacked"
          // className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await makeRoutine(is_public, name, goal);
            navigate("/");
          }}
        >
          <h3 className={styles.header}>Create New Routine</h3>
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
              <label>Goal: </label>
              <input
                value={goal}
                type="text"
                placeholder="goal"
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
              ></input>
            </span>
            <span>
              <label>Public: </label>
              <input
                checked={is_public}
                type="checkbox"
                onChange={(e) => {
                  setIs_public(e.target.checked);
                }}
              ></input>
            </span>
          </div>

          <button className="pure-button pure-button-primary" type="submit">
            Add Routine
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeRoutines;
