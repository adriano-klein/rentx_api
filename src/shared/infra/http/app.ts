import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

// eslint-disable-next-line import-helpers/order-imports
import upload from "@config/upload";

// eslint-disable-next-line import-helpers/order-imports
import swaggerFile from "../../../swagger.json";
import "../container";

import { AppError } from "../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
