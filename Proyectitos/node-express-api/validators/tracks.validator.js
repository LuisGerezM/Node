const { check } = require("express-validator");
const { msgValidation } = require("../schema/msgValidation.schema");
const validateResults = require("../utils/handleValidator.util");

const validatorCreateItem = [
  check("name")
    .exists()
    .withMessage(msgValidation("exists", "name"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "name"))
    .isLength({ min: 5, max: 90 })
    .withMessage(msgValidation("isLength", "name", "5 y 90")),
  check("album").exists().withMessage(msgValidation("exists", "album")).notEmpty().withMessage(msgValidation("notEmpty", "album")),
  check("cover").exists().withMessage(msgValidation("exists", "cover")).notEmpty().withMessage(msgValidation("notEmpty", "cover")),
  check("artist").exists().withMessage(msgValidation("exists", "artist")).notEmpty().withMessage(msgValidation("notEmpty", "artist")),
  check("artist.name").exists().withMessage(msgValidation("exists", "artist.name")).notEmpty().withMessage(msgValidation("notEmpty", "artist.name")),
  check("artist.nickname")
    .exists()
    .withMessage(msgValidation("exists", "artist.nickname"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "artist.nickname")),
  check("artist.nationality")
    .exists()
    .withMessage(msgValidation("exists", "artist.nationality"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "artist.nationality")),
  check("duration").exists().withMessage(msgValidation("exists", "duration")).notEmpty().withMessage(msgValidation("notEmpty", "duration")),
  check("duration.start")
    .exists()
    .withMessage(msgValidation("exists", "duration.start"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "duration.start")),
  check("duration.end")
    .exists()
    .withMessage(msgValidation("exists", "duration.end"))
    .notEmpty()
    .withMessage(msgValidation("notEmpty", "duration.end")),
  check("mediaId").exists().withMessage(msgValidation("exists", "mediaId")).notEmpty().withMessage(msgValidation("notEmpty", "mediaId")),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetItem = [
  check("id").exists().withMessage(msgValidation("exists", "id")).notEmpty().withMessage(msgValidation("notEmpty", "id")),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreateItem, validatorGetItem };
