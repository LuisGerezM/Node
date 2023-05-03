const handleHttpError = require("../utils/handleError.util");

/**
 * Array with allowed roles
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;

    const rolesByUSer = user.role;

    const checkValueRol = roles.some((rolSingle) => rolesByUSer.includes(rolSingle));

    if (!checkValueRol) return handleHttpError(res, "USER_NOT_PERMISION", 403);

    next();
  } catch (error) {
    console.error("Error check rol", error.message);
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRol;
