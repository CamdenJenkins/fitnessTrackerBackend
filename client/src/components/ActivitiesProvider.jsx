import { useState, useEffect } from "react";
import { fetchActivities } from "../api/activities";
import activitiesContext from "../context/activitiesContext";

export default function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getActivities() {
      const activities = await fetchActivities();
      setActivities(activities);
    }
    getActivities();
  }, []);
  return (
    <activitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </activitiesContext.Provider>
  );
}
