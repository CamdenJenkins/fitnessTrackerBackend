const { client } = require("../client");
const createActivities = async ({ name, description }) => {
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
              INSERT INTO activities(name, description)
              VALUES($1, $2)
              RETURNING *;
              `,
      [name, description]
    );
    return activities;
  } catch (error) {
    throw error;
  }
};

const getActivityById = async (activityId) => {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `select * 
            FROM activities
            WHERE activities.id = ${activityId} `
    );

    if (!activity) {
      return null;
    }
    return activity;
  } catch (error) {
    throw error;
  }
};

const getAllActivities = async () => {
  try {
    const { rows } = await client.query(`select * FROM activities`);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { createActivities, getActivityById, getAllActivities };
