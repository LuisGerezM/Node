import { Sequelize, DataTypes } from "sequelize";

import { CustomError } from "@/common";
import { envs, logger } from "@/config";
import { userModelDB } from "./models";

type dbType = { [key: string]: any };

export class SequelizeClient {
	private location = "SequelizeClient";

	private static instance: SequelizeClient;

	public static getInstance(): SequelizeClient {
		logger.info("SequelizeClient getInstance init");

		if (!SequelizeClient.instance) {
			SequelizeClient.instance = new SequelizeClient();
		}
		return SequelizeClient.instance;
	}

	//* modelos
	private defineModelsAndRelations(db: dbType) {
		logger.info(`${this.location} defineModelsAndRelations init`);

		db.User = userModelDB({ DataTypes, db: db.dbConnection });

		return db;
	}

	public async startDB() {
		logger.info(`${this.location} start init`);

		const db: dbType = {};
		try {
			db.dbConnection = new Sequelize(
				envs.POSTGRES_DB,
				envs.POSTGRES_USER_DB,
				envs.POSTGRES_PASSWORD_DB,
				{
					host: envs.POSTGRES_HOST,
					port: envs.POSTGRES_PORT,
					dialect: "postgres",
					logging: false,
				}
			);

			db.Sequelize = Sequelize;

			await db.dbConnection.authenticate();

			if (!db) {
				logger.info(
					`${this.location} Failed to create database client`
				);

				throw CustomError.excecuteException({
					message:
						"Error connecting DB: Failed to create database client.",
					statusCode: 500,
				});
			}

			const searchModelsAndRelations = this.defineModelsAndRelations(db);

			logger.info(`${this.location} BD conected - client created`);

			return { ...searchModelsAndRelations };
		} catch (error) {
			logger.info(`${this.location} - Error connecting DB`);

			const errorWithLocation = CustomError.addOtherInfoOfInterestToError(
				{
					error,
					location: `${this.location} start`,
				}
			);

			throw errorWithLocation;
		}
	}

	public async closeDB(db: dbType) {
		logger.info(`${this.location} close init`);

		if (!Object.keys(db).length) {
			logger.info(`${this.location} db is empty`);
			return;
		}

		try {
			if (!db?.dbConnection) {
				logger.info(`${this.location} no connection found to close`);
				return;
			}

			await db.dbConnection.close();
			logger.info(`${this.location} connection closed successfully`);
		} catch (error) {
			logger.error(`${this.location} error closing connection`, error);

			const errorWithLocation = CustomError.addOtherInfoOfInterestToError(
				{
					error,
					location: `${this.location} close`,
				}
			);

			throw errorWithLocation;
		}
	}
}
