const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt.util");
const { encrypt } = require("../utils/handlePassword.util");
const handleHttpError = require("../utils/handleError.util");
const { compare } = require("bcrypt");
const { UserDAO } = require("../DAO/user.dao");

class AuthController {
  constructor() {
    if (AuthController.instance) return AuthController.instance;
    AuthController.instance = this;
  }

  static getInstance() {
    return new AuthController();
  }

  /**
   * Register user
   * @param {*} req
   * @param {*} res
   */
  async registerController(req, res) {
    try {
      req = matchedData(req);
      const password = await encrypt(req.password);
      const body = { ...req, password };

      const dataUser = await UserDAO.getInstance().createUser(body);

      dataUser.set("password", undefined, { strict: false });

      const data = {
        user: dataUser,
      };

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error register controller ", error.message);
      handleHttpError({ res, messageFormat: "ERROR_REGISTER_USER", errorMessage: error.message });
    }
  }

  /**
   * User login
   * @param {*} req
   * @param {*} res
   */
  async loginController(req, res) {
    try {
      req = matchedData(req);

      const user = await UserDAO.getInstance().findOneUser({ email: req.email });

      if (!user) return handleHttpError({ res, messageFormat: "USER_NOT_EXISTS", code: 404 });

      const hashPassword = user.get("password");

      const check = await compare(req.password, hashPassword);
      if (!check) return handleHttpError({ res, messageFormat: "PASSWORD_OR_USER_INVALID", code: 401 });

      user.set("password", undefined, { strict: false });
      const data = {
        token: await tokenSign(user),
        user,
      };

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error login controller", error.message);
      handleHttpError({ res, messageFormat: "ERROR_LOGIN_USER", errorMessage: error.message });
    }
  }
}

module.exports = { AuthController };
