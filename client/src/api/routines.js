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

export const deleteRoutine = async (routineId) => {
  const response = await fetch(`/routes/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getRoutineById = async (routineId) => {
  const response = await fetch(`/routes/routines/${routineId}`);
  const result = await response.json();
  console.log(result);

  // console.log(filteredRoutine[0]);
  return result;
};
export const editRoutine = async (is_public, name, goal, routineId) => {
  const response = await fetch(`/routes/routines/${routineId}`, {
    method: "PATCH",
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
