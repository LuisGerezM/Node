import { NextFunction, Request, Response } from "express";

import { SequelizeClient } from "@/database/clients";
import { JwtAdapter } from "@/config/jwt.adapter";
import { logger } from "@/config";
import { CustomError } from "@/common";

export class AuthMiddleware {
	private static location = "AuthMiddleware";
	private static statusCode = 401;

	static validateJWT() {
		return async (req: Request, res: Response, next: NextFunction) => {
			logger.info(`${AuthMiddleware.location} validateJWT init`);

			const authorization = req.header("Authorization");

			try {
				if (!authorization) {
					logger.info(`${AuthMiddleware.location} validateJWT`);

					throw CustomError.excecuteException({
						message: "No token provided",
						statusCode: AuthMiddleware.statusCode,
					});
				}

				if (!authorization.startsWith("Bearer ")) {
					logger.info(`${AuthMiddleware.location} validateJWT`);

					throw CustomError.excecuteException({
						message: "Invalid Bearer token",
						statusCode: AuthMiddleware.statusCode,
					});
				}

				const token = authorization.split(" ").at(1) || "";

				const payload = await JwtAdapter.validateToken<{ id: string }>(
					token
				);

				if (!payload) {
					logger.info(`${AuthMiddleware.location} validateJWT`);

					throw CustomError.excecuteException({
						message: "Invalid token",
						statusCode: AuthMiddleware.statusCode,
					});
				}

				logger.info(`${AuthMiddleware.location} payload.id:`);
				logger.info(payload.id);

				(req as any).userID = payload.id;

				next();
			} catch (error) {
				logger.info(`${AuthMiddleware.location} validateJWT error`);

				const errorWithLocation =
					CustomError.addOtherInfoOfInterestToError({
						error,
						location: `${AuthMiddleware.location} validateJWT`,
					});

				next(errorWithLocation);
			}
		};
	}

	static validateUserIsActive({ clientDB }: { clientDB: SequelizeClient }) {
		return async (req: Request, res: Response, next: NextFunction) => {
			logger.info(`${AuthMiddleware.location} validateUserIsActive init`);

			let querySql: string | null = null;
			let client: { [key: string]: any } = {};

			try {
				const userID: string = (req as any).userID;

				client = await clientDB.startDB();

				const findUserData = await client.User.findOne({
					where: { id_user: userID, active: 1 },
					attributes: ["id_user", "active"],
					logging: (sql: string) => {
						querySql = sql.split("Executing (default):")[1].trim();
					},
				});

				console.log("findUserData L93", findUserData);

				if (!findUserData || findUserData.dataValues.active === 0) {
					logger.info(
						`${AuthMiddleware.location} findUserData error`
					);
					logger.info(
						findUserData
							? findUserData?.dataValues?.active
							: findUserData
					);

					throw CustomError.excecuteException({
						message: `user with id ${userID} is not active or not found`,
						statusCode: AuthMiddleware.statusCode,
					});
				}

				next();
			} catch (error) {
				logger.info(
					`${AuthMiddleware.location} validateUserIsActive error`
				);

				const errorWithLocation =
					CustomError.addOtherInfoOfInterestToError({
						error,
						location: `${AuthMiddleware.location} validateUserIsActive`,
						querySql,
					});

				next(errorWithLocation);
			} finally {
				await clientDB.closeDB(client);
			}
		};
	}
}
