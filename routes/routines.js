const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllRoutines,
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
} = require("../db/adapters/routines");
const { authRequired } = require("./utils");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();
    res.send(allRoutines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { is_public, name, goal } = req.body;
    const { id } = req.user;
    const routineData = {
      creator_id: id,
      is_public,
      name,
      goal,
    };
    const routine = await createRoutine(routineData);
    if (routine) {
      res.send({ routine });
    } else {
      res.status(400);
      next({ message: "Error creating routine" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { is_public, name, goal } = req.body;
  const updateFields = {};

  if (is_public) {
    updateFields.is_public = is_public;
  }
  if (name) {
    updateFields.name = name;
  }
  if (goal) {
    updateFields.goal = goal;
  }
  try {
    const originalRoutine = await getRoutineById(routineId);
    if (originalRoutine.creator_id === req.user.id) {
      const updatedRoutine = await updateRoutine(routineId, updateFields);
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "Unauthorized User Error",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.routineId);

    if (routine && routine.creator_id === req.user.id) {
      const updatedRoutine = await updateRoutine(routine.id, {
        is_public: false,
      });

      res.send(updatedRoutine);
    } else {
      next(
        routine
          ? {
              name: "Unauthorized User Error",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "Routine Not Found Error",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
