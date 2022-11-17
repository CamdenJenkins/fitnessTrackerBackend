import styles from "../styles/Footer.module.css";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const { user, loggedIn, setLoggedIn } = useUsers();
  const navigate = useNavigate();
  return (
    <div className={styles.footer}>
      {loggedIn ? (
        <div className={styles.createBar}>
          <button
            id={styles.createroutine}
            onClick={() => {
              navigate("/makeroutine");
            }}
          >
            Create Routine
          </button>

          <button
            id={styles.createactivity}
            onClick={() => {
              navigate("/makeactivity");
            }}
          >
            Create Activity
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
