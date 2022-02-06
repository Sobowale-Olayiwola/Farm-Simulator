module.exports = (sequelize, DataTypes) => {
  const FarmUnit = sequelize.define(
    "FarmUnit",
    {
      next_feeding_time: DataTypes.DATE,
      alive: DataTypes.BOOLEAN,
      farm_building_id: DataTypes.INTEGER,
      health_point: DataTypes.INTEGER,
    },
    {}
  );
  FarmUnit.associate = function (models) {
    // associations can be defined here
    FarmUnit.belongsTo(models.FarmBuilding, {
      foreignKey: "farm_building_id",
      as: "farm_building",
      onDelete: "CASCADE",
    });
  };
  return FarmUnit;
};
