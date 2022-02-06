module.exports = (sequelize, DataTypes) => {
  const FarmBuilding = sequelize.define(
    "FarmBuilding",
    {
      unit_type: DataTypes.STRING,
    },
    {}
  );
  FarmBuilding.associate = function (models) {
    // associations can be defined here
    FarmBuilding.hasMany(models.FarmUnit, {
      foreignKey: "farm_building_id",
      as: "farm_unit",
      onDelete: "CASCADE",
    });
  };
  return FarmBuilding;
};
