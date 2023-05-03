const express = require("express");
const { StorageController } = require("../controllers/storage.controller");
const uploadMiddleware = require("../utils/handleStorage.util");
const { validatorGetItem } = require("../validators/storage.validator");
const routerStorage = express.Router();

/**
 * List of storage items
 */
routerStorage.get("/", StorageController.getInstance().getAllStorages);

/**
 * Get detail of storage item
 */
routerStorage.get("/:id", validatorGetItem, StorageController.getInstance().getSimpleStorage);

/**
 * delete storage item
 */
routerStorage.delete("/:id", validatorGetItem, StorageController.getInstance().deleteStorage);

/**
 * create storage item
 */
routerStorage.post("/", uploadMiddleware.single("myfile"), StorageController.getInstance().createItemStorage);

module.exports = routerStorage;
