import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { HandleErrorUseCase } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService
      .uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };

  uploadMultipleFile = async (req: Request, res: Response) => {
    const type = req.params.type;

    const files = req.body.files as UploadedFile[];

    this.fileUploadService
      .uploadMultiple(files, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };
}
