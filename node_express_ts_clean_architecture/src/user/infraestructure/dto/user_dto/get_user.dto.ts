import { Request } from "express";

import { logger, Validators } from "@/config";

type GetUserTypes = {
	email?: string | null;
	id?: number | null;
};

export class GetUserDto {
	private static location = "GetUserDto";

	public email: GetUserTypes["email"] = null;
	public id: GetUserTypes["id"] = null;

	constructor({ email, id }: GetUserTypes) {
		this.email = email || null;
		this.id = id || null;
	}

	static getUserByEmail(object: {
		[key: string]: any;
	}): [string?, GetUserDto?] {
		logger.info(`${this.location} getUserByEmail init`);

		const { email } = object;

		if (!email) return ["Missing email"];
		if (!Validators.email.test(email)) return ["Email is not valid"];

		return [undefined, new GetUserDto(email)];
	}

	static getUserById(req: Request): [string?, GetUserDto?] {
		logger.info(`${this.location} getUserById init`);

		const id = req?.query?.id;

		if (!id) return ["Missing id"];
		if (typeof id !== "string")
			return ["id must be a string that can be converted to number"];
		if (isNaN(+id))
			return [
				"id must be a number or it must be possible to convert to number",
			];

		return [undefined, new GetUserDto({ id: +id })];
	}
}
