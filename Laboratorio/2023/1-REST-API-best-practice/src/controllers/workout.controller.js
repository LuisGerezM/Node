const workoutService = require("../services/workout.service");

const errorApiResponse = (res, status, message) => res.status(status || 500).send({ status: "FAILED", message: message || "Internal error" });

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    errorApiResponse(res, error.status, error.message || "Internal Error.");
  }
};

const getOneWorkout = (req, res) => {
  console.log(req.params);
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) return errorApiResponse(res, 400, "Parameter 'id' can not be empty.");

  try {
    const workout = workoutService.getOneWorkout(workoutId);

    res.send({ status: "OK", data: workout });
  } catch (error) {
    errorApiResponse(res, error.status, error.message);
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips)
    return errorApiResponse(res, 400, "Ont of the following keys is missing or is empty in request body.");

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);

    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    errorApiResponse(res, error.status, error.message || "Internal Error.");
  }
};

const updateAllWorkout = (req, res) => {
  const updatedAllWorkouts = workoutService.updateAllWorkout(req.params.workoutId);

  res.send("update all workout " + req.params.workoutId);
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  if (!workoutId) return errorApiResponse(res, 400, "Parameter 'id' can not be empty.");

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    errorApiResponse(res, error.status, error.message);
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) return errorApiResponse(res, 400, "Parameter 'id' can not be empty.");

  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    errorApiResponse(res, error.status, error.message);
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateAllWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
