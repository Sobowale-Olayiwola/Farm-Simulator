import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

import farmBuildingRouteHandler from "./src/routes/farmBuilding";
import farmUnitRouteHandler from "./src/routes/farmUnit";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
require("./src/config/sequelize");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/", farmBuildingRouteHandler);
app.use("/api/v1/", farmUnitRouteHandler);
app.use(errorHandler);

module.exports = app;
