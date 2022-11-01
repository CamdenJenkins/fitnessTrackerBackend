const { client } = require("client.js");

// function to add a new user to the database
const createUser = async (username, password) => {
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
const getUser = async (username, password) => {};

// select user by id and return user object, not password though
const getUserById = async (id) => {};

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
