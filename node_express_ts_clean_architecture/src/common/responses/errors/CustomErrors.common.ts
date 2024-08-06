/* eslint-disable no-unused-vars */
import { logger } from "@/config";

type addOtherInfoOfInterestToErrorType = {
	error: unknown | CustomError;
	location: string;
	querySql?: string | null;
};

export class CustomError extends Error {
	public static locationCustomError = "CustomError";
	public static status = "error";

	private constructor(
		public readonly status: string,
		public readonly statusName: string,
		public readonly statusCode: number,
		public readonly message: string,
		public location: string,
		public querySql?: string | null
	) {
		super(message);
	}

	static badRequest(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"badRequest",
			400,
			message,
			location
		);
	}

	static unauthorized(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"unauthorized",
			401,
			message,
			location
		);
	}

	static forbidden(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"forbidden",
			403,
			message,
			location
		);
	}

	static preconditionFailed(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"preconditionFailed",
			412,
			message,
			location
		);
	}

	static notAcceptable(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"notAcceptable",
			406,
			message,
			location
		);
	}

	static notFound(message: string, location: string) {
		return new CustomError(
			CustomError.status,
			"notFound",
			404,
			message,
			location
		);
	}

	static internalServer(
		message: string = "Internal Server Error",
		location: string
	) {
		return new CustomError(
			CustomError.status,
			"internalServerError",
			500,
			message,
			location
		);
	}

	static addOtherInfoOfInterestToError({
		error,
		location,
		querySql = null,
	}: addOtherInfoOfInterestToErrorType) {
		if (error instanceof CustomError) {
			error.location = location;
			error.querySql = querySql;
		} else {
			const message =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			error = new CustomError(
				CustomError.status,
				"internalServerError",
				500,
				message,
				location,
				querySql
			);
		}
		return error;
	}

	static excecuteException(error: { [key: string]: any }) {
		console.log("CustomError excecuteException L91 error", error);

		logger.info(`${CustomError.locationCustomError} getException init`);

		switch (error.statusCode) {
			case 400:
				return CustomError.badRequest(error.message, error.location);
			case 401:
				return CustomError.unauthorized(error.message, error.location);
			case 403:
				return CustomError.forbidden(error.message, error.location);
			case 404:
				return CustomError.notFound(error.message, error.location);
			case 406:
				return CustomError.notFound(error.message, error.location);
			case 412:
				return CustomError.notFound(error.message, error.location);
			default:
				return CustomError.internalServer(
					error.message,
					error.location
				);
		}
	}
}
