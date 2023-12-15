import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  private webserviceUrl: string;

  constructor(
    private readonly emailService: EmailService,
    webserviceUrl: string
  ) {
    this.webserviceUrl = webserviceUrl;
  }

  private async tokenGenerate(properties: { [key: string]: any }) {
    const token = await JwtAdapter.generateToken({
      ...properties,
    });

    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return token;
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const propertiesToGenerateToken = { id: user.id };
      const token = await this.tokenGenerate(propertiesToGenerateToken);

      await this.sendEmailValidationLink(user.email);

      const { password, ...restUserProperties } = UserEntity.fromObject(user);

      return { user: { ...restUserProperties }, token };
    } catch (error) {
      const existUser = await UserModel.findOne({
        email: registerUserDto.email,
      });

      if (existUser) await UserModel.deleteOne({ email: existUser.email });
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest("User or password not found");

    try {
      const isMatching = bcryptAdapter.compare(
        loginUserDto.password,
        user.password
      );

      if (!isMatching)
        throw CustomError.badRequest("User or password not found");

      const { password, ...restUserProperties } = UserEntity.fromObject(user);

      const propertiesToGenerateToken = { id: user.id };
      const token = await this.tokenGenerate(propertiesToGenerateToken);

      return {
        user: restUserProperties,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const propertiesToGenerateToken = { email };
    const token = await this.tokenGenerate(propertiesToGenerateToken);

    const link = `${this.webserviceUrl}/auth/validate-email/${token}`;
    const html = `
    <h1>Validate your email</h1>
    <p> Click on the following link to validate your email</p>
    <a href="${link}"> Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) {
      throw CustomError.internalServer("Error sending email");
    }

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);

    if (!payload) throw CustomError.unauthorized("Invalid Token");

    const { email } = payload as { email: string };

    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await UserModel.findOne({ email });

    if (!user) throw CustomError.internalServer("Email not exists");

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
