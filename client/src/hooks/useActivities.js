import { useContext } from "react";
import activitiesContext from "../context/activitiesContext";

const useActivities = () => {
  const { activities, setActivities } = useContext(activitiesContext);

  return { activities, setActivities };
};

export default useActivities;
