import React from "react";
import useActivities from "../hooks/useActivities";

export default function ActivitiesComponent() {
  const { activities } = useActivities();
  console.log(activities);
  return <div>{JSON.stringify(activities)}</div>;
}
