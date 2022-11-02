const { client } = require("../client");

// Uses a join to get routine that matches id and all macthing activities
const getRoutineById = async (id) => {};

// Return an array of all routines and return them
const getRoutinesWithoutActivities = async () => {};

// Return an array of all routines including their activities with a join
const getAllRoutines = async () => {};

// Return an array of all public routines and their activities with a join
const getAllPublicRoutines = async () => {};

// Return an array of routines by the user and their activities with a join
const getAllRoutinesByUser = async (username) => {};

// Return an array of routines with specific activity id, in routine_activities join, include their activities (use a join)
const getPublicRoutinesByActivity = async (activityId) => {};

// Create and return a new routine
const createRoutine = async ({ creator_id, is_public, name, goal }) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            INSERT INTO routines(creator_id, is_public, name, goal)
            VALUES($1, $2, $3, $4)
            RETURNING *;
            `,
      [creator_id, is_public, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
};

// Get user function, verify password
const getUser = async (username, password) => {
  try {
  } catch (error) {}
};

// Find routine by id and update either isPublic, name, or goal
const updateRoutine = async (routineId, isPublic, name, goal) => {};

// Remove routine from database, delete all routine_activities associated
const destroyRoutine = async (routineId) => {};

module.exports = { createRoutine };
