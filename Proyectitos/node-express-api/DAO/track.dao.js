class TrackDAO {
  #tracksModel = require("../models/index.models");

  constructor() {
    if (TrackDAO.instance) return TrackDAO.instance;
    TrackDAO.instance = this;
  }

  static getInstance() {
    return new TrackDAO();
  }

  async getAllTacks() {
    return await this.#tracksModel.tracksModel.findAllData({});
  }

  async getOneTrack(id) {
    return await this.#tracksModel.tracksModel.findOneData(id);
  }

  async createTrack(body) {
    return await this.#tracksModel.tracksModel.create(body);
  }

  async updateTrack(id, body) {
    return await this.#tracksModel.tracksModel.findOneAndUpdate(id, body, {
      returnOriginal: false,
      returnDocument: "after",
    });
  }

  async deleteTrack(id) {
    return await this.#tracksModel.tracksModel.delete(id);
  }
}
module.exports = { TrackDAO };
