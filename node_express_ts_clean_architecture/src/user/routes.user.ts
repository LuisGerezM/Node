import { Router } from "express";

import { logger } from "@/config";
import { UserDatasourceImpl } from "./infraestructure/datasource_impl/user.datasource.impl";
import { UserRepositoryImpl } from "./infraestructure/repository_impl/user.repository.impl";
import { UserController } from "./presentation";
import { AuthMiddleware } from "@/middlewares";
import { SequelizeClient } from "@/database/clients";

export class UserRoutes {
	static get routes(): Router {
		logger.info("UserRoutes init");

		const router = Router();

		const sequelizeClientInstance = SequelizeClient.getInstance();

		const datasource = new UserDatasourceImpl(sequelizeClientInstance);

		const userRepository = new UserRepositoryImpl(datasource);

		const controller = new UserController(userRepository);

		//* user main routes
		router.get(
			"/",
			[
				AuthMiddleware.validateJWT(),
				AuthMiddleware.validateUserIsActive({
					clientDB: sequelizeClientInstance,
				}),
			],
			controller.getUserById
		);

		return router;
	}
}
