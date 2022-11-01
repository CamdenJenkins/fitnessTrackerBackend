const { client } = require("./client");

const { createUser } = require("./adapters/users");

// drop tables
async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping tables...");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error; // we pass the error up to the function that calls dropTables
  }
}

//create tables
const createTables = async () => {
  try {
    console.log("Starting to build tables...");

    await client.query(
      `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
    );
    CREATE TABLE activities (
        id	SERIAL	PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description	TEXT NOT NULL
    );
    CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        routine_id	INTEGER UNIQUE REFERENCES routines (id),
        activity_id	INTEGER UNIQUE REFERENCES activities (id),
        duration INTEGER,	
        count INTEGER
    );
`
    );
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
};

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });

    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4me",
    });
    const glamgal = await createUser({
      username: "glamgal",
      password: "soglam",
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
};

async function testDB() {
  try {
    // connect the client to the database, finally

    // queries are promises, so we can await them
    const result = await client.query(`SELECT * FROM users;`);

    // for now, logging is a fine way to see what's up
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
