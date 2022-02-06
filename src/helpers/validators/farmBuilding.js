/**
 * Handles the implementation of Joi package for Farm Building service validation
 * @module VALIDATOR:FarmBuilding
 */

const Joi = require("joi");

const createFarmBuildingSchema = Joi.object({
  unit_type: Joi.string().required().label("Unit type"),
  name: Joi.string().required().label("Farm name"),
});

const updateFarmBuildingSchema = Joi.object({
  unit_type: Joi.string().label("Unit type"),
  name: Joi.string().label("Farm name"),
});

module.exports = {
  createFarmBuildingSchema,
  updateFarmBuildingSchema,
};
