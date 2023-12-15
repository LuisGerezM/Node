import { Response } from "express";
import { CustomError } from "../../errors/custom.errors";

export class HandleErrorUseCase {
  static triggerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log("\x1b[31m", `${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };
}
