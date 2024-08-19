/* eslint-disable no-unused-vars */
import { logger } from "@/config";
export class CustomError extends Error {
	public static locationCustomError = "CustomError";
	public static status = "error";

	private constructor(
		public readonly status: string,
		public readonly statusName: string,
		public readonly statusCode: number,
		public readonly message: string,
		public querySql?: string | null
	) {
		super(message);
	}

	static badRequest(message: string) {
		return new CustomError(CustomError.status, "badRequest", 400, message);
	}

	static unauthorized(message: string) {
		return new CustomError(
			CustomError.status,
			"unauthorized",
			401,
			message
		);
	}

	static forbidden(message: string) {
		return new CustomError(CustomError.status, "forbidden", 403, message);
	}

	static preconditionFailed(message: string) {
		return new CustomError(
			CustomError.status,
			"preconditionFailed",
			412,
			message
		);
	}

	static notAcceptable(message: string) {
		return new CustomError(
			CustomError.status,
			"notAcceptable",
			406,
			message
		);
	}

	static notFound(message: string) {
		return new CustomError(CustomError.status, "notFound", 404, message);
	}

	static internalServer(message: string = "Internal Server Error") {
		return new CustomError(
			CustomError.status,
			"internalServerError",
			500,
			message
		);
	}

	static excecuteException(error: { [key: string]: any }) {
		console.log("CustomError excecuteException L91 error", error);

		logger.info(`${CustomError.locationCustomError} getException init`);

		switch (error.statusCode) {
			case 400:
				return CustomError.badRequest(error.message);
			case 401:
				return CustomError.unauthorized(error.message);
			case 403:
				return CustomError.forbidden(error.message);
			case 404:
				return CustomError.notFound(error.message);
			case 406:
				return CustomError.notFound(error.message);
			case 412:
				return CustomError.notFound(error.message);
			default:
				return CustomError.internalServer(error.message);
		}
	}
}
