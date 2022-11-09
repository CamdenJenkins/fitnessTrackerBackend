export async function fetchRoutines() {
  const response = await fetch("/routes/routines");
  const result = await response.json();
  return result;
}

export const makeRoutine = async (is_public, name, goal) => {
  const response = await fetch("/routes/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
};
