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
      <span> {user.username}</span>
      <Link className={styles.routines} to="/routines">
        Routines
      </Link>
      <Link className={styles.activities} to="/activities">
        Activiites
      </Link>

      <Link className={styles.makeRoutine} to="/makeroutine">
        Create Routine
      </Link>
      <Link className={styles.makeActivity} to="makeactivity">
        Create Activity
      </Link>

      {!loggedIn ? (
        <>
          {""}
          <span>
            <Link className={styles.signup} to="/register">
              Sign-up
            </Link>
          </span>
          <span>
            <Link className={styles.login} to="/login">
              Login
            </Link>
          </span>
        </>
      ) : null}

      {loggedIn ? (
        <span>
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
        </span>
      ) : null}
    </nav>
  );
}
