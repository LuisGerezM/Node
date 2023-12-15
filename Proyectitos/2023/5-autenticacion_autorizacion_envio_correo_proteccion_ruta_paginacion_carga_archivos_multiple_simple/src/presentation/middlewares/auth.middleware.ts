import { NextFunction, Request, Response } from "express";
import { CustomError, HandleErrorUseCase, UserEntity } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return HandleErrorUseCase.triggerError(
        CustomError.unauthorized("No token provided"),
        res
      );

    if (!authorization.startsWith("Bearer "))
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest("Invalid Bearer Token"),
        res
      );

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload)
        return HandleErrorUseCase.triggerError(
          CustomError.unauthorized("Invalid token"),
          res
        );

      const user = await UserModel.findById(payload.id);

      if (!user)
        return HandleErrorUseCase.triggerError(
          CustomError.unauthorized("Invalid token - user"),
          res
        );

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log("\x1b[31m", `${error}`);
      HandleErrorUseCase.triggerError(error, res);
    }
  }
}
