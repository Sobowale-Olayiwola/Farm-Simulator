module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("FarmBuildings", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FarmBuildings");
  },
};
