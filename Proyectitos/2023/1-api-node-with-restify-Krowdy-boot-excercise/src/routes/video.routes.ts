// import { Router } from "restify-router";

// import { videoController } from "../controllers";

// const videoRoutes = new Router();

// /**
//  * Move a video from files folder to files-copy folder and change format from webm to mp4
//  */
// videoRoutes.get("/convert-webm-mp4/:name", async (req, res) => {
//   await videoController.convertFromWebmToMp4(req, res);
// });

// /**
//  * Move a video from files folder to files-copy folder and change format from mp4 to webm
//  */
// videoRoutes.get("/convert-mp4-webm/:name", async (req, res) => {
//   await videoController.convertFromMp4ToWebm(req, res);
// });

// /**
//  * Move a video from files folder to files-copy folder and delete sound from it
//  */
// videoRoutes.get("/video-without-sound/:name", async (req, res) => {
//   await videoController.videoWithoutSound(req, res);
// });

// export default videoRoutes;

// routes/videoRoutes.js
export const videoRoutes = (router) => {
  
  router.get("/videos", (req, res, next) => {
    // Lógica para obtener todos los videos
    res.send("List of videos sasdasd");
    return next();
  });

  router.get("/videos/:id", (req, res, next) => {
    // Lógica para obtener un video específico por su ID
    const videoId = req.params.id;
    res.send(`Video with ID ${videoId}`);
    return next();
  });

  // Agrega más rutas relacionadas con videos aquí
};
