const _ = require("lodash");
const moment = require("moment");

/* Create an array of dates for the last numberOfDays until endDate */
const daysArray = (endDate, numberOfDays) =>
  _.range(numberOfDays).map(value =>
    moment(endDate)
      .subtract(value, "days")
      .toDate()
  );

module.exports = {
  daysArray
};
