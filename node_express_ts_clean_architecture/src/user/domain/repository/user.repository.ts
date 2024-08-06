import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
	abstract getUserById(
		id: number
	): Promise<{ status: string; user: UserEntity }>;
}
