import { Router } from "express";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeFileMiddleware } from "../middlewares/type-file.middleware";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController(new FileUploadService());

    router.use(
      TypeFileMiddleware.validTypes(["users", "products", "categories"])
    );
    router.use(FileUploadMiddleware.containFiles);

    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFile);

    return router;
  }
}
