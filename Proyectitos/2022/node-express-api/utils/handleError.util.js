const { responseFormatAccordError } = require("../schema/responseFormatAccordError.schema");

const handleHttpError = ({ res, messageFormat = "Error Interno", errorMessage = "", code = 500 }) => {
  const msgResponse = responseFormatAccordError[messageFormat] || messageFormat;

  res.status(code).send({ status: "error", message: { msgResponse, errorMessage } });
};

module.exports = handleHttpError;
