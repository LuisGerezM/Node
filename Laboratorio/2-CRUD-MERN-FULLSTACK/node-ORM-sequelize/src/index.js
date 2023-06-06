import express from "express";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./v1/routes/blog.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/blogs", blogRoutes);

try {
  await db.authenticate();
  console.log("Conextion exitosa a la BD");
} catch (error) {
  console.log("Error de conexion " + error);
}

app.listen(PORT, () => console.log(`Server UP running in port ${PORT}`));
