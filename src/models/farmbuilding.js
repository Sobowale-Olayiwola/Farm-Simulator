module.exports = (sequelize, DataTypes) => {
  const Farm_Building = sequelize.define(
    "Farm_Building",
    {
      unit_type: DataTypes.STRING,
      next_feeding_time: DataTypes.DATE,
      email: DataTypes.STRING,
    },
    {}
  );
  Farm_Building.associate = function (models) {
    // associations can be defined here
    Farm_Building.hasMany(models.Farm_Unit, {
      foreignKey: "farm_building_id",
      as: "farm_unit",
      onDelete: "CASCADE",
    });
  };
  return Farm_Building;
};
