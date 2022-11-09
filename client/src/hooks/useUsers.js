import { useContext } from "react";
import usersContext from "../context/usersContext";

const useUsers = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useContext(usersContext);

  return { user, setUser, loggedIn, setLoggedIn };
};

export default useUsers;
