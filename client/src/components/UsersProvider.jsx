import { useState, useEffect } from "react";
import { fetchMe } from "../api/users";
import usersContext from "../context/usersContext";

const UsersProvider = ({ children }) => {
  const [user, setUser] = useState({ user: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(user);
  useEffect(() => {
    const getMe = async () => {
      const result = await fetchMe();
      console.log(result);
      if (result.loggedIn === false) {
        setUser({ user: "Guest" });
        setLoggedIn(false);
      } else {
        setUser(result);
        setLoggedIn(true);
      }
    };
    getMe();
    console.log("in the useEffect");
  }, [loggedIn]);
  return (
    <usersContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </usersContext.Provider>
  );
};

export default UsersProvider;
