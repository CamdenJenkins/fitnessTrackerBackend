import { useState, useEffect } from "react";
import { fetchRoutines } from "../api/routines";
import routinesContext from "../context/routinesContext";

export default function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      const routines = await fetchRoutines();
      setRoutines(routines);
    }
    getRoutines();
  }, []);
  return (
    <routinesContext.Provider value={{ routines, setRoutines }}>
      {children}
    </routinesContext.Provider>
  );
}
