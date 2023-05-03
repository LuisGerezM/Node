const { check } = require("express-validator");
const { msgValidation } = require("../schema/msgValidation.schema");
const validateResults = require("../utils/handleValidator.util");

const validatorRegister = [
  check("name")
    .exists()
    .withMessage(msgValidation("exists", "name"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "name"))
    .isLength({ min: 3, max: 99 })
    .withMessage(msgValidation("isLength", "name", "3 y 99")),
  check("age")
    .exists()
    .withMessage(msgValidation("exists", "age"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "age"))
    .isFloat({ min: 8, max: 99 })
    .withMessage(msgValidation("isNumeric", "age", "8 y 99")),
  check("password")
    .exists()
    .withMessage(msgValidation("exists", "password"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "password"))
    .isLength({ min: 6, max: 15 })
    .withMessage(msgValidation("isLength", "password", "6 y 15")),
  check("email")
    .exists()
    .withMessage(msgValidation("exists", "email"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "email"))
    .isEmail()
    .withMessage(msgValidation("isEmail", "email")),
  (req, res, next) => validateResults(req, res, next),
];

const validatorLogin = [
  check("password")
    .exists()
    .withMessage(msgValidation("exists", "password"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "password"))
    .isLength({ min: 6, max: 15 })
    .withMessage(msgValidation("isLength", "password", "6 y 15")),
  check("email")
    .exists()
    .withMessage(msgValidation("exists", "email"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "email"))
    .isEmail()
    .withMessage(msgValidation("isEmail", "email")),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorRegister, validatorLogin };
