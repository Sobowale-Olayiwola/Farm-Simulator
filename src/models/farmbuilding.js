'use strict';
module.exports = (sequelize, DataTypes) => {
  const FarmBuilding = sequelize.define('FarmBuilding', {
    unit_type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  FarmBuilding.associate = function(models) {
    // associations can be defined here
  };
  return FarmBuilding;
};