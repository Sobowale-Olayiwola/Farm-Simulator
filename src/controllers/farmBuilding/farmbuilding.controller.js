import { FarmBuilding, sequelize } from "../../models";
const { QueryTypes } = require("sequelize");
import {
  successResponse,
  errorResponse,
  filterJOIValidation,
} from "../../helpers";
import { createFarmBuildingSchema } from "../../helpers/validators/farmBuilding";

export const getAllFarmBuildings = async (req, res) => {
  try {
    const query = `SELECT
                        fb.unit_type as unit_type,
                        fb."name",
                        COUNT(fu.farm_building_id) AS farm_unit_count
                   FROM
                        "FarmUnits" fu
                         LEFT JOIN "FarmBuildings" fb
                   ON 
                         fb.id = fu.farm_building_id
                   GROUP BY 
                         unit_type, 
                         name,
                         fu.farm_building_id
                    ;
                  `;
    const farmBuildings = await sequelize.query(query, {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    });
    return successResponse(req, res, { farmBuildings });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const createFarmBuilding = async (req, res) => {
  try {
    const { body } = req;
    const { error } = createFarmBuildingSchema.validate(body);
    if (error) throw new Error(filterJOIValidation(error.message));
    const newFarmBuilding = await FarmBuilding.create(body);
    return successResponse(req, res, newFarmBuilding);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
