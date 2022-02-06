"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "FarmBuildings",
      [
        {
          unit_type: "Pig",
          name: "Barney's Pig Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Chicken",
          name: "Meadlow's Chicken Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Sheep",
          name: "Craig's Sheep Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Turkey",
          name: "Sandy's Turkey Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Duck",
          name: "Bill's Duck Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Cow",
          name: "Sally's Cow Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          unit_type: "Goat",
          name: "Kentucky's Goat Farm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("FarmBuildings", null, {});
  },
};
