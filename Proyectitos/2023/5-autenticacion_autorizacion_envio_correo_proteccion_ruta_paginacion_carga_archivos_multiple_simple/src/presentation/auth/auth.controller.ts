import { Request, Response } from "express";
import {
  CustomError,
  HandleErrorUseCase,
  LoginUserDto,
  RegisterUserDto,
} from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.startLogin(req.body);

    if (error)
      return HandleErrorUseCase.triggerError(
        CustomError.badRequest(`${error}`),
        res
      );

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token)
      .then(() => res.json("Email was validates properly"))
      .catch((error) => HandleErrorUseCase.triggerError(error, res));
  };
}
