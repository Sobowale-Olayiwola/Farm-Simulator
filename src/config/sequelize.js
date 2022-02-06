const Sequelize = require("sequelize");
import { initFarmFeedingActivities } from "../helpers";
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    //Initialize farm feeding activities
    initFarmFeedingActivities();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
