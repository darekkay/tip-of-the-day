const { expect } = require("chai");

const generateJSON = require("./json.js");

describe("generate JSON", () => {
  it("return just a single entry", () => {
    const entry = {
      title: "entry title",
      content: "content",
    };

    const feed = generateJSON({
      entry,
    }).content;

    expect(feed).to.equal(JSON.stringify(entry, null, 2));
  });
});
