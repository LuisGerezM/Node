const bcrypt = require("bcrypt");

/**
 * Encrypt password
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 12);

  return hash;
};

/**
 * Compare passwords
 * @param {*} passWordPlain
 * @param {*} hashPassword
 */
const compare = async (passWordPlain, hashPassword) => {
  return await bcrypt.compare(passWordPlain, hashPassword);
};

module.exports = { encrypt, compare };
