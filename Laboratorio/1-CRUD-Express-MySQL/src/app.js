import express from "express";
import employesRoutes from "./routes/employes.routes.js";
import indexRoutes from "./routes/index.routes.js";
import "./config.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", employesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    succes: false,
    message: "endpoint not found",
  });
});

export default app;
