require("dotenv").config();
import {
  successResponse,
  errorResponse,
  filterJOIValidation,
  getHealthPoints,
  getLastTimeFed,
  isIdValid,
  toDateTime,
} from "../../helpers";
import { FarmUnit, FarmBuilding } from "../../models";
import { createFarmUnitSchema } from "../../helpers/validators/farmUnit";

export const createFarmUnit = async (req, res) => {
  try {
    const { body } = req;
    const { farm_building_id } = body;
    const { error } = createFarmUnitSchema.validate(body);

    if (error) {
      throw new Error(filterJOIValidation(error.message));
    }
    const found = await FarmBuilding.findOne({
      where: { id: farm_building_id },
    });
    if (!found) throw new Error("Farm building does not exist");
    const payload = {
      farm_building_id,
      last_time_fed: getLastTimeFed(),
      alive: true,
      health_point: getHealthPoints(),
    };
    const newFarmUnit = await FarmUnit.create(payload);
    newFarmUnit.last_time_fed = toDateTime(newFarmUnit.last_time_fed);
    return successResponse(req, res, newFarmUnit);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getFarmBuildingUnitHealthRecords = async (req, res) => {
  try {
    isIdValid(req.params.farm_building_id);
    const result = await FarmUnit.findAll({
      where: { farm_building_id: req.params.farm_building_id },
      attributes: ["id", "alive", "health_point"],
    });
    result.last_time_fed = toDateTime(result.last_time_fed);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateFarmUnitHealth = async (req, res) => {
  try {
    isIdValid(req.params.id);
    const found = await FarmUnit.findOne({
      where: { id: req.params.id, alive: true },
    });
    if (!found) throw new Error("Farm unit doesn't exist or dead");
    found.health_point += process.env.API_FARM_UNIT_HEALTH_POINT;
    found.save();
    const result = { message: "Sucessfully updated" };
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
