/**
 * Handles the implementation of Joi package for Farm Unit service validation
 * @module VALIDATOR:FarmUnit
 */

const Joi = require("joi");

const createFarmUnitSchema = Joi.object({
  farm_building_id: Joi.number()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
    .required()
    .label("Farm Building ID"),
});

module.exports = {
  createFarmUnitSchema,
};
