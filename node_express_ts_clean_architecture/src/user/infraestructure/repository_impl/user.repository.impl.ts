import { logger } from "@/config";
import { UserEntity } from "@/user/domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserDatasource } from "@/user/domain/datasources";

export class UserRepositoryImpl implements UserRepository {
	private location = "UserRepositoryImpl";

	// eslint-disable-next-line no-unused-vars
	constructor(private readonly datasource: UserDatasource) {}

	async getUserById(
		id: number
	): Promise<{ status: string; user: UserEntity }> {
		logger.info(`${this.location} getUserById init`);

		return await this.datasource.getUserById(id);
	}
}
