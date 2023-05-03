const express = require("express");
const { TracksController } = require("../controllers/tracks.controller");
const checkRol = require("../middlweare/rol.middleware");
const { authMiddleware } = require("../middlweare/session.middleware");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks.validator");
const routerTracks = express.Router();

/**
 * List all tracks
 */
routerTracks.get("/", authMiddleware, TracksController.getInstance().getTracks);

/**
 * Get a track detail.
 */
routerTracks.get("/:id", authMiddleware, validatorGetItem, TracksController.getInstance().getOneTrack);

/**
 * Create a track.
 */
routerTracks.post("/", authMiddleware, checkRol(["admin", "user"]), validatorCreateItem, TracksController.getInstance().createTrack);

/**
 * Edit all data track
 */
routerTracks.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, TracksController.getInstance().updateTrack);

/**
 * Delete a track.
 */
routerTracks.delete("/:id", authMiddleware, validatorGetItem, TracksController.getInstance().deleteTrack);

module.exports = routerTracks;
