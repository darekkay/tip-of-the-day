/* eslint-disable no-unused-expressions */

const moment = require("moment");

const { daysArray } = require("./date");

const lastDateValue = moment("2018-01-02T03:04:05Z").toDate();

describe("daysArray", () => {
  test("returns the last day", () => {
    expect(daysArray(lastDateValue, 1)).toEqual([lastDateValue]);
  });

  test("returns the last 3 days", () => {
    expect(daysArray(lastDateValue, 3)).toEqual([
      lastDateValue,
      moment(lastDateValue).subtract(1, "days").toDate(),
      moment(lastDateValue).subtract(2, "days").toDate(),
    ]);
  });

  test("returns an empty array for zero days", () => {
    expect(daysArray(lastDateValue, 0)).toHaveLength(0);
  });
});
