const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;
const usersRouter = express.Router();
const { getUserByUsername, createUser } = require("../db/adapters/users");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      message: "thank you for signing up",
      user,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (!user) {
      next({
        name: "InvaildLogin",
        message: "Username not found",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(password);
    console.log(validPassword);
    delete user.password;

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;
      res.send({ user });
    } else {
      next({
        name: "Invaild Login",
        message: "Username or Password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
