import { Router } from "restify-router";
import restify from "restify";
import bunyan from "bunyan";
import morgan from "morgan";

import { setupRoutes, videoRoutes } from "./routes";
import { consoleColors } from "./utilities";

const server = restify.createServer({
  name: process.env.TYPE_ENVIRONMENT,
  log: bunyan.createLogger({
    name: "audit",
    level: "error",
  }),
});

server.use(morgan("dev"));

const router = new Router();
setupRoutes(router);

// router.add("/v1/api", videoRoutes);
router.applyRoutes(server);

const initServer = async () => {
  server.listen(process.env.SERVER_PORT || 8000, () => {
    console.log(`${consoleColors.blueColor}%s listening at %s`, server.name, `${server.url}/v1/api`);
  });
};

export { initServer };
