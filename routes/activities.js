const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const activitiesRouter = express.Router();
