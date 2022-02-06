/**
 *
 * This is the entry-point for all Custom Nodejs Events in the application
 * @module EVENTS:Config
 */

const EventEmitter = require("events");

/**
 *
 * This class extends the NodeJS event emitter class and allows
 *  for using custom events in the application.
 * @class
 */
class AppEvent extends EventEmitter {}

const appEvent = new AppEvent();

appEvent.on("error", (error) => {
  Logger.error(`[AppEvent Error] ${error}`);
});

module.exports = appEvent;
