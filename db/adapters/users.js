const { client } = require("../client");

// function to add a new user to the database
const createUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password)
          VALUES($1, $2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
          `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user function, verify password
const getUser = async (username, password) => {
  try {
  } catch (error) {}
};

// select user by id and return user object, not password though
const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT id, username
            FROM users
            WHERE id=${userId}
          `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// select user by username and return user object
const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
