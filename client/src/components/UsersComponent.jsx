import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registerUser, loginUser } from "../api/users";
import styles from "../styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useUsers from "../hooks/useUsers";

export default function UsersComponent() {
  const { method } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn } = useUsers();

  return (
    <div className={styles.form}>
      <form
        className="pure-form pure-form-stacked"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          } else {
            result = await loginUser(username, password);
          }
          console.log(result);
          if (result.user) {
            setPassword("");
            setUsername("");
            setLoggedIn(true);
            navigate("/");
          } else {
            setError(result.error);
          }
        }}
      >
        {error && <h5>{error}</h5>}
        <input
          className={styles.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          className={styles.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button
          id={styles.button}
          className="pure-button pure-button-primary"
          type="submit"
        >
          {method === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}
