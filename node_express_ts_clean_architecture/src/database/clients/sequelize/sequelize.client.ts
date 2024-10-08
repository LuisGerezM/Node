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

	//* models
	private defineModels(db: dbType) {
		logger.info(`${this.location} defineModels init`);

		db.User = userModelDB({ DataTypes, db: db.dbConnection });

		return db;
	}

	//* relations
	private defineRelations(db: dbType) {
		logger.info(`${this.location} defineRelations init`);

		//* for this example I havent relationship

		return db;
	}

	private async connectDB(db: dbType) {
		logger.info(`${this.location} connectDB init`);

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
			logger.info(`${this.location} Failed to create database client`);

			throw CustomError.excecuteException({
				message:
					"Error connecting DB: Failed to create database client.",
				statusCode: 500,
			});
		}

		logger.info(`${this.location} connectDB - client created`);

		return db;
	}

	public async startDB() {
		logger.info(`${this.location} start init`);

		let db: dbType = {};
		try {
			db = await this.connectDB(db);
			db = this.defineModels(db);
			db = this.defineRelations(db);

			logger.info(`${this.location} BD conected - client created`);
			return db;
		} catch (error) {
			logger.info(`${this.location} - Error connecting DB`);

			throw error;
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
			logger.info(error);

			throw error;
		}
	}
}
