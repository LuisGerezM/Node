import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());

  app.use(GithubSha256Middleware.verifySignature);

  const controller = new GithubController();

  app.post("/api/github", controller.webhookHandler);

  const port = envs.PORT;
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}
