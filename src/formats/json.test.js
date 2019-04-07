const { expect } = require("chai");
const moment = require("moment");

const generateJSON = require("./json.js");

const mockDate = moment("2018-01-02T03:04:05Z").toDate();

describe("generate JSON", () => {
  it("return just a single entry", () => {
    const entry = {
      title: "entry title",
      content: "content"
    };

    const feed = generateJSON({
      source: {
        id: "mock",
        title: "feed title",
        entries: [entry]
      },
      date: mockDate
    }).content;

    expect(feed).to.equal(JSON.stringify(entry, null, 2));
  });
});
