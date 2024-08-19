import { UserRoutes } from "@/user/routes.user";
import { Router } from "express";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		//* rutas principales
		router.use("/api/v1/user", UserRoutes.routes);

		return router;
	}
}
