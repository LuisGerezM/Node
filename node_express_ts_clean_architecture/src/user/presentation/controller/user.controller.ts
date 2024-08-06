import { NextFunction, Request, Response } from "express";

import { BaseResponse } from "@/common";
import { logger } from "@/config";
import { UserRepository } from "@/user/domain/repository/user.repository";
import { GetUser } from "@/user/domain/use_case";
import { GetUserDto } from "@/user/infraestructure/dto/user_dto/get_user.dto";

export class UserController {
	private location = "UserController";

	// eslint-disable-next-line no-unused-vars
	constructor(private readonly userRepository: UserRepository) {}

	getUserById = async (req: Request, res: Response, next: NextFunction) => {
		logger.info(`${this.location} getUserById init`);

		const locationError: string = `${this.location} getUserById`;

		try {
			const [error, getUserDto] = GetUserDto.getUserById(req);

			if (error || !getUserDto?.id) {
				throw {
					status: "error",
					location: locationError,
					error: { message: error },
					statusError: 400,
				};

				return;
			}

			const getUserUseCase = new GetUser(this.userRepository);

			const getUser = await getUserUseCase.execute(getUserDto!.id!);

			const baseResponse = new BaseResponse({
				status: getUser.status,
				statusCode: 200,
				message: getUser.user,
			});

			baseResponse.sendReponse(res);
		} catch (error) {
			logger.info("UserController getUserById catch");
			next(error);
		}
	};
}
