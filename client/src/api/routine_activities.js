export const addRoutineActivity = async (
  routine_id,
  activity_id,
  count,
  duration
) => {
  const response = await fetch("/routes/routine_activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routine_id,
      activity_id,
      count,
      duration,
    }),
  });
  const result = await response.json();
  return result;
};

export const editCountDuration = async (count, duration, raId) => {
  const response = await fetch(`/routes/routine_activities/${raId}}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count,
      duration,
    }),
  });
  const result = await response.json();
  return result;
};

export async function fetchRoutineActivity(routineId, activityId) {
  const response = await fetch(
    `/routes/routine_activities/${routineId}/${activityId}`
  );
  const result = await response.json();
  return result;
}
