export async function fetchActivities() {
  const response = await fetch("/routes/activities");
  const result = await response.json();
  return result;
}
