class StorageDAO {
  #storageModel = require("../models/index.models");

  constructor() {
    if (StorageDAO.instance) return StorageDAO.instance;
    StorageDAO.instance = this;
  }

  static getInstance() {
    return new StorageDAO();
  }

  async getAllStorages() {
    return await this.#storageModel.storageModel.find({});
  }

  async getSimpleStorage(id) {
    return await this.#storageModel.storageModel.findById(id);
  }

  async createItemStorage(fileData) {
    return await this.#storageModel.storageModel.create(fileData);
  }

  async deleteStorage(id) {
    return await this.#storageModel.storageModel.delete({ _id: id });
  }
}

module.exports = { StorageDAO };
