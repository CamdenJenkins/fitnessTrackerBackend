import React from "react";
import useRoutines from "../hooks/useRoutines";

export default function RoutinesComponent() {
  const { routines } = useRoutines();
  console.log(routines);
  return <div>{JSON.stringify(routines)}</div>;
}
