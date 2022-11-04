require("dotenv").config();
const PORT = 8080;
const express = require("express");
const cookieParser = require("cookie-parser");
const server = express();
const morgan = require("morgan");
const apiRouter = require("./routes");
const { client } = require("./db/client");
const { COOKIE_SECRET } = process.env;
client.connect();

server.use(morgan("dev"));

server.use(express.json());
server.use(cookieParser(COOKIE_SECRET));
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});
server.use("/routes", apiRouter);

server.use((err, req, res, next) => {
  res.status(500).send(err);
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
