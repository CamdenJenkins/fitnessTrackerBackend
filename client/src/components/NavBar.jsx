import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/users";

import useUsers from "../hooks/useUsers";
import styles from "../styles/Nav.module.css";
export default function NavBar() {
  const navigate = useNavigate();
  const { user, loggedIn, setLoggedIn } = useUsers();
  console.log(user);
  console.log(loggedIn);
  return (
    <nav className={styles.nav}>
      <Link className={styles.username} to="/routines/myroutines">
        {" "}
        {user.username}
      </Link>
      <Link className={styles.routines} to="/">
        Routines
      </Link>
      <Link className={styles.activities} to="/activities">
        Activiites
      </Link>

      {!loggedIn ? (
        <>
          {""}

          <Link className={styles.signup} to="/register">
            Sign-up
          </Link>

          <Link className={styles.login} to="/login">
            Login
          </Link>
        </>
      ) : null}

      {loggedIn ? (
        <>
          <button
            className={styles.logout}
            onClick={() => {
              logoutUser();
              navigate("/login");
              setLoggedIn(false);
            }}
          >
            Log Out
          </button>
        </>
      ) : null}
    </nav>
  );
}
