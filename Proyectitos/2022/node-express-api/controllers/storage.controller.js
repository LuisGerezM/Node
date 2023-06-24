const fs = require("fs");
const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/handleError.util");
const { StorageDAO } = require("../DAO/storage.dao");

class StorageController {
  #PUBLIC_URL = process.env.PUBLIC_URL;
  #MEDIA_PATH = `${__dirname}/../storage`;

  constructor() {
    if (StorageController.instance) return StorageController.instance;
    StorageController.instance = this;
  }

  static getInstance() {
    return new StorageController();
  }

  /**
   * Obtener lista de la base de datos
   * @param {*} req
   * @param {*} res
   */
  getAllStorages = async (req, res) => {
    try {
      const data = await StorageDAO.getInstance().getAllStorages();
      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error get all storages", error.message);
      handleHttpError({ res, messageFormat: "ERROR_LIST_ITEMS", errorMessage: error.message });
    }
  };

  /**
   * Obtenerun detalle
   * @param {*} req
   * @param {*} res
   */
  getSimpleStorage = async (req, res) => {
    try {
      const { id } = matchedData(req);
      const data = await StorageDAO.getInstance().getSimpleStorage(id);
      res.send({ status: "success", data });
    } catch (error) {
      handleHttpError({ res, messageFormat: "ERROR_GET_SIMPLE_ITEM", errorMessage: error.message });
    }
  };

  /**
   * Insertar un registro
   * @param {*} req
   * @param {*} res
   */
  createItemStorage = async (req, res) => {
    try {
      const { body, file } = req;

      const fileData = {
        filename: file.filename,
        url: `${this.#PUBLIC_URL}/${file.filename}`,
      };

      const data = await StorageDAO.getInstance().createItemStorage(fileData);
      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error", error.message);
      handleHttpError({ res, messageFormat: "ERROR_LIST_ITEMS", errorMessage: error.message });
    }
  };

  /**
   * Eliminar registro
   * @param {*} req
   * @param {*} res
   */
  deleteStorage = async (req, res) => {
    try {
      const { id } = matchedData(req);

      const getInstanceStorageDAO = StorageDAO.getInstance();

      const dataFile = await getInstanceStorageDAO.getSimpleStorage(id);

      if (!dataFile) throw new Error("No se encontró el archivo a eliminar");

      await getInstanceStorageDAO.deleteStorage({ _id: id });

      const { filename } = dataFile;

      const filePath = `${this.#MEDIA_PATH}/${filename}`;

      const destinationPath = `${__dirname}/../storageLogicalDeleted/${filename}`;

      fs.rename(filePath, destinationPath, (error) => {
        if (error) throw new Error("Error al mover el archivo eliminado");
      });

      const data = {
        filePath,
        deleted: true,
      };

      res.send({ status: "success", data });
    } catch (error) {
      console.error("Error delete storage", error.message);
      handleHttpError({ res, messageFormat: "ERROR_DELETE_ITEM", errorMessage: error.message });
    }
  };
}

module.exports = {
  StorageController,
};
