import { NextFunction, Response } from "express";

import { logger } from "../../../config";
import { CustomError } from "./CustomErrors.common";

type logErrorHandlerType = {
	error: unknown | CustomError;
	res: Response;
	next?: NextFunction | null;
};

export type errorReturnStructure = {
	status: string;
	location: string;
	error: { message: string };
	statusError: number;
};

export class ErrorsManager {
	private location = "ErrorsManager";

	private triggerError(error: unknown | CustomError, res: Response) {
		logger.info(`${this.location} triggerError init - error:`);
		logger.info(error);

		console.log("triggerError L33 error", error);

		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({
				status: error.status,
				statusCode: error.statusCode,
				statusName: error.statusName,
				message: error.message,
			});
		}

		console.log("\x1b[31m", `${error}`);
		return res.status(500).json({
			error: "Internal server error",
			message:
				error instanceof Error
					? error.message || "an internal error occurred"
					: "an unknown error occurred",
		});
	}

	private logErrorHandler = ({ error, res }: logErrorHandlerType) => {
		logger.info(`${this.location} logErrorHandler init`);
		logger.info("ERROR:");
		logger.info(error);

		//* save log in database

		//* if the error is internal then send email
	};

	public ErrorHandler = ({ error, res, next }: logErrorHandlerType) => {
		logger.info(`${this.location} ErrorHandler init`);

		this.logErrorHandler({ error, res, next });
		this.triggerError(error, res);
	};
}
