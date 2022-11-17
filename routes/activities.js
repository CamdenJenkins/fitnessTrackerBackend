const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllActivities,
  createActivities,
  updateActivity,
  getActivityById,
  getActivityByName,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");

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

activitiesRouter.get("/:activityId", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const singleActivity = await getActivityById(activityId);
    res.send(singleActivity);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description } = req.body;
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
    if (req.user) {
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

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const routinesByActivity = await getPublicRoutinesByActivity(activityId);

    if (routinesByActivity) {
      res.send({ routines: routinesByActivity });
    } else {
      next({
        name: "No Routines",
        message: "No Routine linked to activity",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
