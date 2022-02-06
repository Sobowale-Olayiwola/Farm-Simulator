import { FarmBuilding, FarmUnit } from "../../models";
import {
  successResponse,
  errorResponse,
  filterJOIValidation,
} from "../../helpers";
import { createFarmBuildingSchema } from "../../helpers/validators/farmBuilding";
const Sequelize = require("sequelize");

// Location.findAll({
//   attributes: {
//     include: [
//       [Sequelize.fn("COUNT", Sequelize.col("farmUnits.id")), "farmUnitCount"],
//     ],
//   },
//   include: [
//     {
//       model: farmunit,
//       attributes: [],
//     },
//   ],
// });
export const getAllFarmBuildings = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 100;
    const farmBuildings = await FarmBuilding.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("FarmUnits.farm_building_id")),
            "farmUnitCount",
          ],
        ],
      },
      include: [
        {
          model: FarmUnit,
          attributes: [],
          as: "farm_unit",
        },
      ],
      // include: [
      //   {
      //     model: FarmUnit,
      //     attributes: {
      //       include: [
      //         [
      //           Sequelize.fn("COUNT", Sequelize.col("farmUnit.id")),
      //           "farm_unit_count",
      //         ],
      //       ],
      //     },
      //     as: "farm_unit",
      //   },
      // ],
      // attributes: {
      //   include: [
      //     [
      //       Sequelize.fn("COUNT", Sequelize.col("FarmUnits.id")),
      //       "farm_unit_count",
      //     ],
      //   ],
      // },
      // include: [
      //   {
      //     model: FarmUnit,
      //     attributes: [],
      //     as: "farm_unit",
      //     duplicating: true,
      //   },
      // ],
      // order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
      limit,
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
