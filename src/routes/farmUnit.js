import express from "express";
import * as farmUnitController from "../controllers/farmUnit/farmUnit.controller";

const router = express.Router();
router.get(
  "/farm-units/:farm_building_id",
  farmUnitController.getFarmBuildingUnitHealthRecords
);
router.post("/farm-units", farmUnitController.createFarmUnit);
router.put("/farm-units/:id", farmUnitController.updateFarmUnitHealth);

module.exports = router;
