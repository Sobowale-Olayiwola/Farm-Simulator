import express from "express";
import * as farmUnitController from "../controllers/farmUnit/farmUnit.controller";
import TokenBucket from "../helpers/tokenBucket";

function limitRequests(perSecond, maxBurst) {
  const buckets = new Map();

  // Return an Express middleware function
  return function limitRequestsMiddleware(req, res, next) {
    if (!buckets.has(req.ip)) {
      buckets.set(req.ip, new TokenBucket(maxBurst, perSecond));
    }

    const bucketForIP = buckets.get(req.ip);
    if (bucketForIP.take()) {
      next();
    } else {
      res.status(429).send("Client rate limit exceeded");
    }
  };
}

const router = express.Router();
router.get(
  "/farm-units/:farm_building_id",
  farmUnitController.getFarmBuildingUnitHealthRecords
);
router.post("/farm-units", farmUnitController.createFarmUnit);
router.put(
  "/farm-units/:id",
  limitRequests(1, 0.5),
  farmUnitController.updateFarmUnitHealth
);

module.exports = router;
