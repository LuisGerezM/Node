import { Router } from "express";
import userModel from "../schemas/user_schemas.js";

const accountRouter = Router();

accountRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
});

accountRouter.get("/:guid", async (req, res) => {
  const { guid } = req.params;

  const user = await userModel.findById(guid).exec();

  if (!user) return res.status(404).send();

  return res.send(user);
});

accountRouter.post("/", async (req, res) => {
  const { guid, name } = req.body;

  if (!guid || !name) return res.state(400).send();

  const user = await userModel.findById(guid).exec();

  if (user) return res.status(409).send("El usuario ya se encuentra registrado");

  const newUser = new userModel({ _id: guid, name });

  await newUser.save();

  return res.send("usuario registrado");
});

accountRouter.patch("/:guid", async (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;

  if (!name) return res.state(400).send();

  const user = await userModel.findById(guid).exec();

  if (!user) res.status(404).send();

  user.name = name;

  await user.save();

  return res.send(user);
});

accountRouter.delete("/:guid", async (req, res) => {
  const { guid } = req.params;
  const user = await userModel.findById(guid).exec();

  if (!user) return res.status(404).send();

  await user.remove();

  return res.send();
});

export default accountRouter;
