const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const { getRoutineById } = require("../db/adapters/routines");
const {
  addActivityToRoutine,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActiviitiesByRoutine,
} = require("../db/adapters/routine_activites");
const { authRequired } = require("./utils");
const routineActivitiesRouter = express.Router();

routineActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const routine_activity = await addActivityToRoutine(req.body);
    console.log(routine_activity);
    if (routine_activity) {
      res.send({ routine_activity });
    } else {
      res.status(400);
      next({ message: "Error creating routine_activity" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

routineActivitiesRouter.patch(
  "/:raId",
  authRequired,
  async (req, res, next) => {
    const { raId } = req.params;
    const { count, duration } = req.body;
    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }

    try {
      const originalRa = await getRoutineActivityById(raId);
      const routine = await getRoutineById(originalRa.routine_id);
      if (routine.creator_id === req.user.id) {
        const updatedRa = await updateRoutineActivity(raId, updateFields);
        res.send({ routine: updatedRa });
      } else {
        next({
          name: "Unauthorized User Error",
          message: "You cannot update a routine_activity that is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:raId",
  authRequired,
  async (req, res, next) => {
    try {
      const { raId } = req.params;
      const routineActivity = await getRoutineActivityById(raId);
      const routine = await getRoutineById(routineActivity.routine_id);
      if (routine.creator_id === req.user.id) {
        destroyRoutineActivity(raId);
        res.send({ Deleted: routineActivity });
      } else {
        next(
          routineActivity
            ? {
                name: "Unauthorized User Error",
                message:
                  "You cannot delete a routine_activity which is not yours",
              }
            : {
                name: "Routine_activity Not Found Error",
                message: "That routine_activity does not exist",
              }
        );
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.get(
  "/:routineId/:activityId",
  async (req, res, next) => {
    try {
      const { routineId, activityId } = req.params;

      const ra = await getRoutineActiviitiesByRoutine(routineId, activityId);
      res.send(ra);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
