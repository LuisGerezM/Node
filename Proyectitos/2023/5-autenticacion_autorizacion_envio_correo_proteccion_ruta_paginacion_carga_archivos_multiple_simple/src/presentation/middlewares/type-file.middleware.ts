import { NextFunction, Request, Response } from "express";
import { CustomError, HandleErrorUseCase } from "../../domain";

export class TypeFileMiddleware {
  static validTypes(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type = req.url.split("/").at(2) ?? "";

      if (!validTypes.includes(type))
        return HandleErrorUseCase.triggerError(
          CustomError.badRequest(
            `Invalid type ${type}, valid ones ${validTypes}`
          ),
          res
        );

      next();
    };
  }
}
