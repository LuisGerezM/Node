import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
	abstract getUserById(
		id: number
	): Promise<{ status: string; user: UserEntity }>;
}
