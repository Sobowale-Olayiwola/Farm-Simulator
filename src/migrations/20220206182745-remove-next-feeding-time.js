module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("FarmBuildings", "next_feeding_time");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FarmBuildings");
  },
};
