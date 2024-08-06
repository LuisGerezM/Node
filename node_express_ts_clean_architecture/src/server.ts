import express, { NextFunction, Request, Response, Router } from "express";
import { CustomError, ErrorsManager } from "./common";

type errorMiddlewareTypes = {
	error: unknown | CustomError;
};

interface Options {
	port: number;
	routes: Router;
}

export class Server {
	private app = express();

	private readonly port: number;
	private readonly routes: Router;

	constructor(options: Options) {
		const { port, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async start() {
		//* Middlewares
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true })); // x-www-

		//* use the defined routes
		this.app.use(this.routes);

		//* errors middlewares

		this.app.use(
			(
				error: errorMiddlewareTypes,
				req: Request,
				res: Response,
				next: NextFunction
			) => {
				const errorsManager = new ErrorsManager();
				errorsManager.ErrorHandler({ error, res, next });
			}
		);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
