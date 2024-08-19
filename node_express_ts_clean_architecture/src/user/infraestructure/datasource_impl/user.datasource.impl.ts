import { CustomError } from "@/common";
import { logger } from "@/config";
import { SequelizeClient } from "@/database/clients";
import { UserDatasource } from "@/user/domain/datasources/user.datasources";
import { UserEntity } from "@/user/domain/entities/user.entity";

export class UserDatasourceImpl implements UserDatasource {
	private location = "UserDatasourceImpl";

	// eslint-disable-next-line no-unused-vars
	constructor(private readonly clientDB: SequelizeClient) {}

	async getUserById(
		id: number
	): Promise<{ status: string; user: UserEntity }> {
		logger.info(`${this.location} getUserById init`);

		let client: { [key: string]: any } = {};

		try {
			client = await this.clientDB.startDB();

			const findUserData = await client.User.findOne({
				where: { id_user: id, active: 1 },
			});

			if (!findUserData) {
				throw CustomError.excecuteException({
					message: `user with id ${id} not found`,
					statusCode: 404,
				});
			}

			return {
				status: "success",
				user: UserEntity.fromObject(findUserData.dataValues),
			};
		} catch (error) {
			logger.info(`${this.location} getUserById catch`);

			throw error;
		} finally {
			await this.clientDB.closeDB(client);
		}
	}
}
