import { logger } from "@/config";
import { Response } from "express";

interface IBaseResponse {
	status: string;
	statusCode: number;
	message: string | { [key: string]: any };
	deepLink?: string | null;
}

export class BaseResponse implements IBaseResponse {
	public location = "BaseResponse";

	private _status: string;
	private _statusCode: number;
	private _message: string | { [key: string]: any };
	private _deepLink: string | null;

	constructor({
		status,
		statusCode,
		message,
		deepLink = null,
	}: IBaseResponse) {
		this._status = status;
		this._statusCode = statusCode;
		this._message = message;
		this._deepLink = deepLink;
	}

	get status() {
		return this._status;
	}

	get statusCode() {
		return this._statusCode;
	}

	get message() {
		return this._message;
	}

	get deepLink() {
		return this._deepLink;
	}

	public sendReponse(res: Response) {
		logger.info(`${this.location} sendReponse init`);

		res.status(this._statusCode).json({
			status: this._status,
			message: this._message,
			deepLink: this._deepLink || null,
		});
	}
}
