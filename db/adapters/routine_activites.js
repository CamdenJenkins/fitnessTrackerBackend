const { client } = require("../client");

const addActivityToRoutine = async ({
  routine_id,
  activity_id,
  count,
  duration,
}) => {
  try {
    const {
      rows: [ra],
    } = await client.query(
      `
                INSERT INTO routine_activities (routine_id, activity_id, count, duration)
                VALUES($1, $2, $3, $4)
                RETURNING *;
                `,
      [routine_id, activity_id, count, duration]
    );
    return ra;
  } catch (error) {
    throw error;
  }
};

const getRoutineActivityById = async (routineActivityId) => {
  try {
    const {
      rows: [ra],
    } = await client.query(
      `select * 
      FROM routine_activities
      WHERE routine_activities.id = ${routineActivityId}`
    );
    return ra;
  } catch (error) {
    throw error;
  }
};

const getRoutineActiviitiesByRoutine = async (routineId, activityId) => {
  try {
    const { rows } = await client.query(
      `select * 
      FROM routine_activities
      WHERE routine_id=${routineId}
      AND 
      WHERE activity_id=${activityId}
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const destroyRoutineActivity = async (id) => {
  try {
    const {
      rows: [deletedRa],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE routine_activities.id = ${id}
      RETURNING *;
      `
    );
    return deletedRa;
  } catch (error) {
    throw error;
  }
};

const destroyRoutineActivityByRoutineId = async (id) => {
  try {
    const {
      rows: [deletedRa],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE routine_id = ${id}
      RETURNING *;
      `
    );
    return deletedRa;
  } catch (error) {
    throw error;
  }
};

const updateRoutineActivity = async (raId, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const result = await client.query(
      `
        UPDATE routine_activities
        SET ${setString}
        WHERE routine_activities.id = ${raId}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return getRoutineActivityById(raId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActiviitiesByRoutine,
  destroyRoutineActivity,
  destroyRoutineActivityByRoutineId,
  updateRoutineActivity,
};
