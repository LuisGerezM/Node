const Workout = require("../model/Workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (filterParams) => {
  const allWorkouts = Workout.getAllWorkouts(filterParams);
  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const workout = Workout.getOneWorkout(workoutId);
  return workout;
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
  };

  const createdWorkout = Workout.createNewWorkout(workoutToInsert);

  return createdWorkout;
};

const updateAllWorkout = (workoutId, changes) => {
  return;
};

const updateOneWorkout = (workoutId, changes) => {
  const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  Workout.deleteOneWorkout(workoutId);
  return;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateAllWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
