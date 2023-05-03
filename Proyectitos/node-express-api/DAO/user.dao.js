class UserDAO {
  #usersModel = require("../models/index.models");

  constructor() {
    if (UserDAO.instance) return UserDAO.instance;
    UserDAO.instance = this;
  }

  static getInstance() {
    return new UserDAO();
  }

  async createUser(body) {
    return await this.#usersModel.usersModel.create(body);
  }

  async findOneUser(email) {
    return await this.#usersModel.usersModel.findOne(email);
  }
}

module.exports = { UserDAO };
