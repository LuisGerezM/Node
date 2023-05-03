const recordService = require("../services/record.service");

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId)
    return res.send(400).send({
      status: "FAILED",
      message: "Parameter 'id' can not be empty.",
    });

  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.send({ status: "OK", data: record });
  } catch (error) {
    res.status(error.status || 500).send({ status: "FAILED", message: error.message || "Internal error." });
  }
};

module.exports = { getRecordForWorkout };
