import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../../domain";
import { Uuid } from "../../config";

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  }

  private checkExtensions(
    fileExtension: string,
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    if (!validExtensions.includes(fileExtension))
      throw CustomError.badRequest(
        `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
      );
  }

  private moveFileInFolder(
    file: UploadedFile,
    fileExtension: string,
    destination: string
  ) {
    const fileName = `${this.uuid()}.${fileExtension}`;

    file.mv(`${destination}/${fileName}`);

    return { fileName };
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      this.checkExtensions(fileExtension, validExtensions);

      const destination = path.resolve(__dirname, "../../..", folder);
      this.checkFolder(destination);

      return this.moveFileInFolder(file, fileExtension, destination);
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    const destination = path.resolve(__dirname, "../../..", folder);
    this.checkFolder(destination);

    const fileNames = await Promise.all(
      files.map((file) => {
        const fileExtension = file.mimetype.split("/").at(1) ?? "";
        this.checkExtensions(fileExtension, validExtensions);

        return this.moveFileInFolder(file, fileExtension, destination);
      })
    );

    return fileNames;
  }
}
