/* eslint-disable no-unused-expressions */

const { expect } = require("chai");
const moment = require("moment");

const { daysArray } = require("./date");

const lastDateValue = moment("2018-01-02T03:04:05Z").toDate();

describe("daysArray", () => {
  it("returns the last day", () => {
    expect(daysArray(lastDateValue, 1)).to.deep.equal([lastDateValue]);
  });

  it("returns the last 3 days", () => {
    expect(daysArray(lastDateValue, 3)).to.deep.equal([
      lastDateValue,
      moment(lastDateValue)
        .subtract(1, "days")
        .toDate(),
      moment(lastDateValue)
        .subtract(2, "days")
        .toDate()
    ]);
  });

  it("returns an empty array for zero days", () => {
    expect(daysArray(lastDateValue, 0)).to.be.empty;
  });
});
