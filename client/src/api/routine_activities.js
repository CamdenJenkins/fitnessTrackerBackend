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
