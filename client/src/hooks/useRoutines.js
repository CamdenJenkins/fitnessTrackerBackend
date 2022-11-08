import { useContext } from "react";
import routinesContext from "../context/routinesContext";

const useRoutines = () => {
  const { routines, setRoutines } = useContext(routinesContext);

  return { routines, setRoutines };
};

export default useRoutines;
