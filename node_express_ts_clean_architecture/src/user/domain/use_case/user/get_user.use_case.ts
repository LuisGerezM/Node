import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repository/user.repository";

export interface GetUserUseCase {
	execute(id: number): Promise<{ status: string; user: UserEntity }>;
}

export class GetUser implements GetUserUseCase {
	constructor(private readonly repository: UserRepository) {}

	execute(id: number): Promise<{ status: string; user: UserEntity }> {
		return this.repository.getUserById(id);
	}
}
