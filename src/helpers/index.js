import appEvent from "../events/_config";

require("dotenv").config();

export const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

export const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

export const isIdValid = (id) => {
  id = parseInt(id);
  if (!(id !== "NaN" && id > 0 && id < Number.MAX_SAFE_INTEGER))
    throw new Error("Invalid id supplied.");
  return;
};
export const filterJOIValidation = () => {
  const regex = /["]+/g;
  return message.replace(regex, "");
};
export const initFarmFeedingActivities = () => {
  console.log("Farm feed activities is being monitored");
  setInterval(() => {
    appEvent.emit("FARM_BUILDING_FEEDING_TIME");
  }, process.env.FARM_BUILDING_FEEDING_INTERVAL);
};

export const getHealthPoints = () => {
  let min = Math.ceil(process.env.MIN_HEALTH_POINTS);
  let max = Math.floor(process.env.MAX_HEALTH_POINTS);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const getLastTimeFed = () => {
  const date = new Date();
  const seconds = date.getTime() / 1000;
  return Math.round(seconds);
};

export const toDateTime = (secs) => {
  let t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
};

export const getRandomLastTimeFed = () => {
  const date = new Date();
  const seconds = date.getTime() / 1000;
  let min = Math.ceil(1);
  let max = Math.floor(10000);
  return seconds - Math.floor(Math.random() * (max - min) + min);
};

export const getExpectedFarmUnitFutureFeedingTime = () => {
  const date = new Date();
  const seconds = date.getTime() / 1000;
  //convert feeding interval from milliseconds to seconds
  const farmUnitFeedingInterval = process.env.FARM_UNIT_FEEDING_INTERVAL / 1000;
  const futureFeedingTime = seconds + farmUnitFeedingInterval;
  return Math.round(futureFeedingTime);
};

//For value of lasttimefed
export const getCurrentTimeInSeconds = () => {
  const date = new Date();
  const seconds = date.getTime() / 1000;
  return Math.round(seconds);
};

export const getNumberOfHealthPointsToReduceBy = (lastTimeFed, currentTime) => {
  let timeElapsed = currentTime - lastTimeFed;
  let healthPointsToReduceBy = Math.floor(
    timeElapsed / (process.env.FARM_UNIT_FEEDING_INTERVAL / 1000)
  );
  return healthPointsToReduceBy;
};

export const getNumberOfHealthPointsToGain = (healthPointsLost) => {
  let healthPointToGain = 0.5 * healthPointsLost;
  return Math.floor(healthPointToGain);
};
