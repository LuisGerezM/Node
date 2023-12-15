const express = require("express");
const workoutController = require("../../controllers/workout.controller");
const recordController = require("../../controllers/record.controller");

const workoutRouter = express.Router();

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 message:
 *                   type: string
 *                   example: "Internal error"
 */
workoutRouter
  .get("/", workoutController.getAllWorkouts)

  .get("/:workoutId", workoutController.getOneWorkout)
  .get("/:workoutId/records", recordController.getRecordForWorkout)

  .post("/", workoutController.createNewWorkout)
  .put("/:workoutId", workoutController.updateAllWorkout)
  .patch("/:workoutId", workoutController.updateOneWorkout)
  .delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = workoutRouter;
