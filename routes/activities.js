const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllActivities,
  createActivities,
  updateActivity,
  getActivityById,
} = require("../db/adapters/activities");
const { authRequired } = require("./utils");
const activitiesRouter = express.Router();

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const activity = await createActivities(req.body);
    if (activity) {
      res.send({ activity });
    } else {
      res.status(400);
      next({ message: "Error creating activity" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  try {
    const originalActivity = await getActivityById(activityId);
    if (originalActivity.id === req.user.id) {
      const updatedActivity = await updateActivity(activityId, updateFields);
      res.send({ activity: updatedActivity });
    } else {
      next({
        name: "Unauthorized User Error",
        message: "You cannot update an activity that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
