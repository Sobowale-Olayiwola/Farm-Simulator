/**
 *
 * This is the entry-point for all Custom Nodejs Events in the application
 * @module EVENTS:Config
 */

const EventEmitter = require("events");
import {
  getCurrentTimeInSeconds,
  getNumberOfHealthPointsToGain,
  getNumberOfHealthPointsToReduceBy,
} from "../helpers";
import { FarmUnit } from "../models";

/**
 *
 * This class extends the NodeJS event emitter class and allows
 *  for using custom events in the application.
 * @class
 */
class AppEvent extends EventEmitter {}

const appEvent = new AppEvent();

appEvent.on("FARM_BUILDING_FEEDING_TIME", async () => {
  try {
    const result = await FarmUnit.findAll({
      where: {
        alive: true,
      },
    });
    for (let i = 0; i < result.length; i += 1) {
      const healthPointsLost = getNumberOfHealthPointsToReduceBy(
        result[i].last_time_fed,
        getCurrentTimeInSeconds()
      );
      const currentHealthPoint = result[i].health_point - healthPointsLost;
      if (currentHealthPoint === 0 || currentHealthPoint < 0) {
        result[i].alive = false;
        await FarmUnit.update(result[i].alive, {
          where: { id: result[i].id },
        });
      } else {
        const healthPointGained =
          getNumberOfHealthPointsToGain(healthPointsLost);
        result[i].health_point = currentHealthPoint;
        result[i].health_point += healthPointGained;
        await FarmUnit.update(result[i].health_point, {
          where: { id: result[i].id },
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = appEvent;
