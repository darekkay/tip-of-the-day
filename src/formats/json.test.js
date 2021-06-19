const generateJSON = require("./json.js");

describe("generate JSON", () => {
  test("return just a single entry", () => {
    const entry = {
      title: "entry title",
      content: "content",
    };

    const feed = generateJSON({
      entry,
    }).content;

    expect(feed).toEqual(JSON.stringify(entry, null, 2));
  });
});
