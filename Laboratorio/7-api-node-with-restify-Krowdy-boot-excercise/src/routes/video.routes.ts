import { Router } from "restify-router";

import { videoController } from "../controllers";

const videoRoutes = new Router();

/**
 * Move a video from files folder to files-copy folder and change format from webm to mp4
 */
videoRoutes.get("/convert-webm-mp4/:name", async (req, res) => {
  await videoController.convertFromWebmToMp4(req, res);
});

/**
 * Move a video from files folder to files-copy folder and change format from mp4 to webm
 */
videoRoutes.get("/convert-mp4-webm/:name", async (req, res) => {
  await videoController.convertFromMp4ToWebm(req, res);
});

/**
 * Move a video from files folder to files-copy folder and delete sound from it
 */
videoRoutes.get("/video-without-sound/:name", async (req, res) => {
  await videoController.videoWithoutSound(req, res);
});

export default videoRoutes;
