import express from "express";
import * as farmBuildingController from "../controllers/farmBuilding/farmbuilding.controller";

const router = express.Router();

router.get("/farm-buildings", farmBuildingController.getAllFarmBuildings);
router.post("/farm-buildings", farmBuildingController.createFarmBuilding);

module.exports = router;
