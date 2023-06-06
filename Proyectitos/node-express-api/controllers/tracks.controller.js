const { matchedData } = require("express-validator");
const { TrackDAO } = require("../DAO/track.dao");
const handleHttpError = require("../utils/handleError.util");
const getProperties = require("../utils/handlePropertiesEngine.util");

class TracksController {
  constructor() {
    if (TracksController.instance) return TracksController.instance;
    TracksController.instance = this;
  }

  static getInstance() {
    return new TracksController();
  }

  /**
   * get all tracks of database
   * @param {*} req
   * @param {*} res
   */
  async getTracks(req, res) {
    try {
      const data = await TrackDAO.getInstance().getAllTacks();

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error get tracks", error.message);
      handleHttpError({ res, messageFormat: "ERROR_LIST_ITEMS", errorMessage: error.message });
    }
  }

  /**
   * get track details
   * @param {*} req
   * @param {*} res
   */
  async getOneTrack(req, res) {
    try {
      const { id } = matchedData(req);

      const data = await TrackDAO.getInstance().getOneTrack(id);

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error get one track", error.message);
      handleHttpError({ res, messageFormat: "ERROR_GET_SIMPLE_ITEM", errorMessage: error.message });
    }
  }

  /**
   * create a track
   * @param {*} req
   * @param {*} res
   */
  async createTrack(req, res) {
    try {
      const body = matchedData(req);

      const data = await TrackDAO.getInstance().createTrack(body);

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error create track", error.message);
      handleHttpError({ res, messageFormat: "ERROR_CREATE_ITEM", errorMessage: error.message });
    }
  }

  /**
   * update a track
   * @param {*} req
   * @param {*} res
   */
  async updateTrack(req, res) {
    try {
      const { id, ...body } = matchedData(req);

      const trackInstance = TrackDAO.getInstance();

      const checkTrackExist = await trackInstance.getOneTrack(id);

      if (checkTrackExist.length === 0) return handleHttpError({ res, messageFormat: "ERROR_UPDATE_TRACK_NOT_EXIST" });

      const queryTrackById = {
        [getProperties().id]: id,
      };

      const data = await trackInstance.updateTrack(queryTrackById, body);

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error update track", error.message);
      handleHttpError({ res, messageFormat: "ERROR_UPDATE_TRACK", errorMessage: error.message });
    }
  }

  /**
   * delete a track register
   * @param {*} req
   * @param {*} res
   */
  async deleteTrack(req, res) {
    try {
      const { id } = matchedData(req);

      const queryTrackById = {
        [getProperties().id]: id,
      };

      const data = await TrackDAO.getInstance().deleteTrack(queryTrackById);

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error delete track", error.message);
      handleHttpError({ res, messageFormat: "ERROR_DELETE_ITEM", errorMessage: error.message });
    }
  }
}

module.exports = { TracksController };
