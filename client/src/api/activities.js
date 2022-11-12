export async function fetchActivities() {
  const response = await fetch("/routes/activities");
  const result = await response.json();
  return result;
}

export const makeActivity = async (name, description) => {
  const response = await fetch("/routes/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
};

export const getActivityById = async (activityId) => {
  const response = await fetch(`/routes/activities/${activityId}`);
  const result = await response.json();
  console.log(result);

  return result;
};

export const editActivity = async (name, description, activityId) => {
  const response = await fetch(`/routes/activities/${activityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
};
