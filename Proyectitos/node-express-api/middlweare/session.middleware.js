const { usersModel } = require("../models/index.models");
const handleHttpError = require("../utils/handleError.util");
const { verifyToken } = require("../utils/handleJwt.util");
const getProperties = require("../utils/handlePropertiesEngine.util");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return handleHttpError({ res, messageFormat: "NEED_SESSION", code: 401 });

    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken) return handleHttpError({ res, messageFormat: "NO_PAYLOAD_DATA", code: 401 });

    const queryUser = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    const user = await usersModel.findOne(queryUser);

    req.user = user;

    next();
  } catch (error) {
    console.error("Error auth middleware", error.message);
    handleHttpError({ res, messageFormat: "NOT_SESSION", code: 401 });
  }
};

module.exports = { authMiddleware };
