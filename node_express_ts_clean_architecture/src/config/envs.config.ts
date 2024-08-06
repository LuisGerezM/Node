import "dotenv/config";
import { get } from "env-var";

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	JWT_SEED: get("JWT_SEED").required().asString(),

	PUBLIC_PATH: get("PUBLIC_PATH").required().asString(),

	POSTGRES_HOST: get("POSTGRES_HOST").required().asString(),
	POSTGRES_PORT: get("POSTGRES_PORT").required().asPortNumber(),
	POSTGRES_DB: get("POSTGRES_DB").required().asString(),
	POSTGRES_USER_DB: get("POSTGRES_USER_DB").required().asString(),
	POSTGRES_PASSWORD_DB: get("POSTGRES_PASSWORD_DB").required().asString(),
};
