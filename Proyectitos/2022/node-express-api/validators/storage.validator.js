const { check } = require("express-validator");
const { msgValidation } = require("../schema/msgValidation.schema");
const validateResults = require("../utils/handleValidator.util");

const validatorGetItem = [
  check("id").exists().withMessage(msgValidation("exists", "id")).notEmpty().withMessage(msgValidation("notEmpty", "id")),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorGetItem };
