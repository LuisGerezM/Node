const DB = require("../db/db.json");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (!record) throw { status: 400, message: `Can't find workout with the id '${workoutId}` };

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error.message || "Internal error" };
  }
};

module.exports = { getRecordForWorkout };
