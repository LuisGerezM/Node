import { Router } from "express";
import { createEmploye, deleteEmploye, updateAllDataEmploye, updateEmploye, getEmployes, getEmploye } from "../controllers/employes.controller.js";

const employesRoutes = Router();

employesRoutes.get("/employees", getEmployes);

employesRoutes.get("/employees/:id", getEmploye);

employesRoutes.post("/employees", createEmploye);

employesRoutes.delete("/employees/:id", deleteEmploye);

employesRoutes.put("/employees/:id", updateAllDataEmploye);

employesRoutes.patch("/employees/:id", updateEmploye);

export default employesRoutes;
