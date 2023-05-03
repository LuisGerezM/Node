const express = require("express");
const { AuthController } = require("../controllers/auth.controller");

const { validatorLogin, validatorRegister } = require("../validators/auth.validator");
const routerAuth = express.Router();

/**
 * Sesion init
 */
routerAuth.post("/login", validatorLogin, AuthController.getInstance().loginController);

/**
 * Register
 */
routerAuth.post("/register", validatorRegister, AuthController.getInstance().registerController);

module.exports = routerAuth;
