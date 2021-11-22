import * as dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import "./config/db_connection";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const app: express.Application = express();

const port: any = process.env.PORT || 8000;

const index_router = require("./src/routes/index_routes");

app.use(express.json());

app.use("/api", index_router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
