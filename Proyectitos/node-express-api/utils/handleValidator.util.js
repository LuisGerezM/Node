const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.error("Error validate results", error.message);
    res.status(400).send({ status: "error", message: error.array() });
  }
};

module.exports = validateResults;
