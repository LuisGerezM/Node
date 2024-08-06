import { envs } from "./config/envs.config";
import { AppRoutes } from "./config/routes/routes.config";

import { Server } from "./server";

(async () => {
	main();
})();

async function main() {
	const server = new Server({
		port: envs.PORT,
		routes: AppRoutes.routes,
	});

	server.start();
}
