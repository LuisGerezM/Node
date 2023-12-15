import { NextFunction, Request, Response } from "express";
import { CustomError, HandleErrorUseCase } from "../../domain";

export class FileUploadMiddleware {
  static addFileInBody = (req: Request) => {
    const files = req.files;
    if (!Array.isArray(files!.files)) {
      req.body.files = [files!.files];
    } else {
      req.body.files = files!.files;
    }
  };

  static containFiles(req: Request, res: Response, next: NextFunction) {
    const files = req.files;

    if (!files || Object.keys(files).length === 0)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest("No files were selected"),
        res
      );

    FileUploadMiddleware.addFileInBody(req);

    next();
  }
}
