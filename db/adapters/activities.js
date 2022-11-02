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

module.exports = { createActivities };
