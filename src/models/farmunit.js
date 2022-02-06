module.exports = (sequelize, DataTypes) => {
  const Farm_Unit = sequelize.define(
    "Farm_Unit",
    {
      next_feeding_time: DataTypes.DATE,
      alive: DataTypes.BOOLEAN,
      farm_building_id: DataTypes.INTEGER,
      health_point: DataTypes.INTEGER,
    },
    {}
  );
  Farm_Unit.associate = function (models) {
    // associations can be defined here
    Farm_Unit.belongsTo(models.Farm_Building, {
      foreignKey: "farm_building_id",
      as: "farm_building",
      onDelete: "CASCADE",
    });
  };
  return Farm_Unit;
};
