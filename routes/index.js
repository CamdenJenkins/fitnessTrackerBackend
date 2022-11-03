const express = require("express");
const apiRouter = express.Router();

const healthRouter = require("./health");
const usersRouter = require("./users");
apiRouter.use("/health", healthRouter);
apiRouter.use("/users", usersRouter);
module.exports = apiRouter;
