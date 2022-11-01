const { client } = require("client.js");

async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    // queries are promises, so we can await them
    const result = await client.query(`SELECT * FROM users;`);

    // for now, logging is a fine way to see what's up
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

testDB();
