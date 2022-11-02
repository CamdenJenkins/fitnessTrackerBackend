const { client } = require("../client");

// Uses a join to get routine that matches id and all macthing activities
const getRoutineById = async (id) => {
  try {
    const {
      rows: [routine],
    } = await client.query(`
        SELECT routines.*,  users.username AS "creatorName",
 			
        CASE WHEN ra."routine_id" is NULL THEN'[]'::json
        ELSE
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'count', ra.count,
            'duration', ra.duration
             )
            ) END AS activities
                    FROM routines
       
                    LEFT JOIN routine_activities AS ra
             ON routines.id = ra."routine_id"
            LEFT JOIN activities 
            ON ra."activity_id" = activities.id
            JOIN users
             ON routines."creator_id" = users.id	
            WHERE routines.id=${id}
            GROUP BY routines.id, ra."routine_id", users.username
              `);
    if (!routine) {
      return null;
    }
    return routine;
  } catch (error) {
    throw error;
  }
};

// Return an array of all routines and return them
const getRoutinesWithoutActivities = async () => {
  try {
    const { rows } = await client.query(
      `
          SELECT * FROM routines
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// Return an array of all routines including their activities with a join
const getAllRoutines = async () => {
  try {
    const { rows } = await client.query(
      `SELECT routines.*, users.username AS "creatorName",
          CASE WHEN ra."routine_id" is NULL THEN'[]'::json
          ELSE
          JSON_AGG(
              JSON_BUILD_OBJECT(
              'id', activities.id,
              'name', activities.name,
              'description', activities.description,
              'count', ra.count,
              'duration', ra.duration
              )
          ) END AS activities
          FROM routines	
          LEFT JOIN routine_activities AS ra
              ON routines.id = ra."routine_id"
          LEFT JOIN activities 
              ON ra."activity_id" = activities.id
          JOIN users
              ON routines."creator_id" = users.id	
          GROUP BY routines.id, ra."routine_id", users.username
        `
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

// Return an array of all public routines and their activities with a join
const getAllPublicRoutines = async () => {
  try {
    const { rows } = await client.query(`
            SELECT routines.*,  users.username AS "creatorName",
                 
            CASE WHEN ra."routine_id" is NULL THEN'[]'::json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', activities.id,
                'name', activities.name,
                'description', activities.description,
                'count', ra.count,
                'duration', ra.duration
                 )
                ) END AS activities
                        FROM routines
           
                        LEFT JOIN routine_activities AS ra
                 ON routines.id = ra."routine_id"
                LEFT JOIN activities 
                ON ra."activity_id" = activities.id
                JOIN users
                 ON routines."creator_id" = users.id	
                WHERE routines.is_public = true
                GROUP BY routines.id, ra."routine_id", users.username
                  `);

    return rows;
  } catch (error) {
    throw error;
  }
};

// Return an array of routines by the user and their activities with a join
const getAllRoutinesByUser = async (username) => {
  try {
    const { rows } = await client.query(`
                SELECT routines.*,  users.username AS "creatorName",
                     
                CASE WHEN ra."routine_id" is NULL THEN'[]'::json
                ELSE
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                    'id', activities.id,
                    'name', activities.name,
                    'description', activities.description,
                    'count', ra.count,
                    'duration', ra.duration
                     )
                    ) END AS activities
                            FROM routines
               
                            LEFT JOIN routine_activities AS ra
                     ON routines.id = ra."routine_id"
                    LEFT JOIN activities 
                    ON ra."activity_id" = activities.id
                    JOIN users
                     ON routines."creator_id" = users.id	
                    WHERE users.username='${username}'
                    GROUP BY routines.id, ra."routine_id", users.username
                      `);

    return rows;
  } catch (error) {
    throw error;
  }
};

const getPublicRoutinesByUser = async (username) => {
  try {
    const { rows } = await client.query(`
                    SELECT routines.*,  users.username AS "creatorName",
                         
                    CASE WHEN ra."routine_id" is NULL THEN'[]'::json
                    ELSE
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                        'id', activities.id,
                        'name', activities.name,
                        'description', activities.description,
                        'count', ra.count,
                        'duration', ra.duration
                         )
                        ) END AS activities
                                FROM routines
                   
                                LEFT JOIN routine_activities AS ra
                         ON routines.id = ra."routine_id"
                        LEFT JOIN activities 
                        ON ra."activity_id" = activities.id
                        JOIN users
                         ON routines."creator_id" = users.id	
                        WHERE users.username='${username}' AND routines.is_public = true
                        GROUP BY routines.id, ra."routine_id", users.username
                          `);

    return rows;
  } catch (error) {
    throw error;
  }
};

// Return an array of routines with specific activity id, in routine_activities join, include their activities (use a join)
const getPublicRoutinesByActivity = async (activityId) => {
  try {
    const { rows } = await client.query(`
                        SELECT routines.*,  users.username AS "creatorName",
                             
                        CASE WHEN ra."routine_id" is NULL THEN'[]'::json
                        ELSE
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                            'id', activities.id,
                            'name', activities.name,
                            'description', activities.description,
                            'count', ra.count,
                            'duration', ra.duration
                             )
                            ) END AS activities
                                    FROM routines
                       
                                    LEFT JOIN routine_activities AS ra
                             ON routines.id = ra."routine_id"
                            LEFT JOIN activities 
                            ON ra."activity_id" = activities.id
                            JOIN users
                             ON routines."creator_id" = users.id	
                            WHERE activities.id = ${activityId} AND routines.is_public = true
                            GROUP BY routines.id, ra."routine_id", users.username
                              `);

    return rows;
  } catch (error) {
    throw error;
  }
};

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

// Find routine by id and update either isPublic, name, or goal
const updateRoutine = async (routineId, isPublic, name, goal) => {};

// Remove routine from database, delete all routine_activities associated
const destroyRoutine = async (routineId) => {};

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
};
