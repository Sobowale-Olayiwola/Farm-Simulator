module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("FarmBuildings", "email");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FarmBuildings");
  },
};
