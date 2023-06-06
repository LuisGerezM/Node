const jwt = require("jsonwebtoken");
const getProperties = require("../utils/handlePropertiesEngine.util");
const propertiesKey = getProperties();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Debes pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

/**
 * Debes pasar el token de sesion - el JWT, para verificar si es nuestro
 * @param {*} tokenJWT
 */
const verifyToken = async (tokenJWT) => {
  try {
    const token = jwt.verify(tokenJWT, JWT_SECRET);
    return token;
  } catch (error) {
    console.error("Error verify token", error.message);
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
