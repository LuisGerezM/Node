import { UserRoutes } from "@/user/routes.user";
import { Router } from "express";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		//* main routes
		router.use("/api/v1/user", UserRoutes.routes);

		return router;
	}
}
