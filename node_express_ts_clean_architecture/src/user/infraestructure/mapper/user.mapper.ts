import { logger } from "@/config";
import { UserEntity, userEntityType } from "@/user/domain/entities/user.entity";

export class UserMapper {
	private static location = "UserMapper";

	static userMapper(user: userEntityType) {
		logger.info(`${this.location} init`);

		return UserEntity.fromObject(user);
	}
}
