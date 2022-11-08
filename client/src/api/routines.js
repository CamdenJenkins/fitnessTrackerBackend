export async function fetchRoutines() {
  const response = await fetch("/routes/routines");
  const result = await response.json();
  return result;
}
