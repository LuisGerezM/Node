import { createServer } from "http";
import { envs } from "./config/envs.config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { WssService } from "./presentation/services";
import { consoleColors } from "./config/console_colors.config";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () => {
    console.log(consoleColors.bgCyan, `Server running on port: ${envs.PORT}`);
  });
}
