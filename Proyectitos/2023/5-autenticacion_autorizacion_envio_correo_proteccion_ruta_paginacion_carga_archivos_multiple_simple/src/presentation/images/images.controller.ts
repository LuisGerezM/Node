import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class ImageController {
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { type = "", img = "" } = req.params;

    const imagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );

    if (!fs.existsSync(imagePath))
      return CustomError.notFound(`Imae not found`);

    res.sendFile(imagePath);
  };
}
