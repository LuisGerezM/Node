import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRouter = Router();

authRouter.get("/publico", (req, res) => res.send("Endpoint público"));

authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send(400);

  try {
    const user = authByEmailPwd(email, password);

    if (user.role !== "admin") return res.send(403);

    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default authRouter;
