import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

import publicRoutes from "./src/routes/public";
import apiRoutes from "./src/routes/api";
import adminRoutes from "./src/routes/admin";
import farmBuildingRouteHandler from "./src/routes/farmBuilding";
import farmUnitRouteHandler from "./src/routes/farmUnit";
import apiMiddleware from "./src/middleware/apiAuth";
import adminMiddleware from "./src/middleware/adminAuth";
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
app.use("/pub", publicRoutes);
// app.use("/api", apiMiddleware, apiRoutes);
// apiMiddleware, adminMiddleware,
app.use("/api/admin", adminRoutes);
app.use("/api/v1/", farmBuildingRouteHandler);
app.use("/api/v1/", farmUnitRouteHandler);
app.use(errorHandler);

module.exports = app;
