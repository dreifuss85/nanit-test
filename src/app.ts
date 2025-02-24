import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import postsRoutes from "./routes/postsRoutes";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import connectDB from "./config/db";

const OpenApiValidator = require("express-openapi-validator");
const PORT = process.env.PORT || 3000;

export const app = express();

app.use(cors());
app.use(bodyParser.json());

// Swagger setup

const apiSpec = fs.readFileSync(
  path.join(__dirname, "../docs/swagger.yaml"),
  "utf8",
);
const swaggerDocument = yaml.load(apiSpec) as OpenAPIV3.Document;

const apiSpecPath = path.join(__dirname, "../docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    validateRequests: true,
  }),
);
connectDB();

app.use("/api", [postsRoutes]);

app.use((err: any, req: express.Request, res: express.Response) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`,
  );
});
