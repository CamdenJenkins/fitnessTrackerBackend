const { client } = require("./client");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");
const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require("./adapters/routines");
const {
  createActivities,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("./adapters/activities");
const {
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActiviitiesByRoutine,
  destroyRoutineActivity,
  updateRoutineActivity,
} = require("./adapters/routine_activites");

const {
  createUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");

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
        routine_id	INTEGER REFERENCES routines (id) NOT NULL,
        activity_id	INTEGER REFERENCES activities (id) NOT NULL,
        duration INTEGER,	
        count INTEGER,
        UNIQUE  (routine_id, activity_id)
    );
`
    );
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
};

// async function createInitialUsers() {
//   try {
//     console.log("Starting to create users...");

//     const albert = await createUser({
//       username: "albert",
//       password: "bertie99",
//     });

//     const sandra = await createUser({
//       username: "sandra",
//       password: "2sandy4me",
//     });
//     const glamgal = await createUser({
//       username: "glamgal",
//       password: "soglam",
//     });

//     console.log("Finished creating users!");
//   } catch (error) {
//     console.error("Error creating users!");
//     throw error;
//   }
// }
const seedDb = async () => {
  console.log(`...seeding users`);
  for (const user of users) {
    await createUser(user);
  }
  console.log(`...seeding routines`);
  for (const routine of routines) {
    await createRoutine(routine);
  }
  console.log(`...seeding activities`);
  for (const activity of activities) {
    await createActivities(activity);
  }
  console.log("...seeding ra");
  for (const ra of routine_activities) {
    await addActivityToRoutine(ra);
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
};

async function testDB() {
  try {
    // connect the client to the database, finally

    // queries are promises, so we can await them
    console.log("Starting to test database...");

    console.log("Calling getUserById with 1");
    const albert = await getUserById(1);
    console.log("Result:", albert);

    console.log("Calling getUserByUsername with albert");
    const userByUsernameResult = await getUserByUsername("albert");
    console.log("Result:", userByUsernameResult);

    console.log("Calling getAllRoutines");
    const getAllRoutinesResult = await getAllRoutines();
    console.log("Result:", getAllRoutinesResult);

    console.log("Calling getRoutinebyId");
    const routineById = await getRoutineById(1);
    console.log("Result:", routineById);

    console.log("Calling getRoutinesWithoutActivities");
    const routinesWithoutActivities = await getRoutinesWithoutActivities();
    console.log("Result:", routinesWithoutActivities);

    console.log("Calling getAllPublicRoutines");
    const publicRoutines = await getAllPublicRoutines();
    console.log("Result:", publicRoutines);

    console.log("Calling getAllRoutinesByUser ");
    const routinesByUser = await getAllRoutinesByUser("albert");
    console.log("Result:", routinesByUser);

    console.log("Calling getPublicRoutinesByUser");
    const publicRoutinesByUser = await getPublicRoutinesByUser("albert");
    console.log("Result:", publicRoutinesByUser);

    console.log("Calling getPublicRoutinesByActivity");
    const publicRoutinesByActivity = await getPublicRoutinesByActivity(1);
    console.log("Result:", publicRoutinesByActivity);

    console.log("Calling getActivityById");
    const activityById = await getActivityById(1);
    console.log("Result:", activityById);

    console.log("Calling getAllActivities");
    const allActivities = await getAllActivities();
    console.log("Result:", allActivities);

    console.log("Calling getRoutineActivityById");
    const routineActivityById = await getRoutineActivityById(1);
    console.log("Result:", routineActivityById);

    console.log("Calling getRoutineActivitiesByRoutine");
    const routineActivitiesByRoutine = await getRoutineActiviitiesByRoutine(1);
    console.log("Result:", routineActivitiesByRoutine);

    console.log("Calling updateRoutine");
    const updateRoutineResult = await updateRoutine(1, {
      is_public: true,
      name: "Calves Only",
      goal: "Big Calves",
    });
    console.log("Result:", updateRoutineResult);

    // console.log("Calling destroyRoutine");
    // const destroyRoutineResult = await destroyRoutine(1);
    // console.log("Result:", destroyRoutineResult);

    // console.log("Calling destroyRoutineActivity");
    // const destroyRoutineActivityResult = await destroyRoutineActivity(3);
    // console.log("Result:", destroyRoutineActivityResult);

    console.log("Calling updateActivity");
    const updatedActivity = await updateActivity(1, {
      name: "pushups",
      description: "push off the ground",
    });
    console.log("Result:", updatedActivity);

    console.log("Calling updateRoutineActivity");
    const updatedRoutineActivity = await updateRoutineActivity(4, {
      duration: 5,
      count: 5,
    });
    console.log("Result:", updatedRoutineActivity);

    console.log("Finished database tests!");

    // for now, logging is a fine way to see what's up
  } catch (error) {
    console.error(error);
  }
}
rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
