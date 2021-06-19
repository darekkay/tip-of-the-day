const { hash } = require("./hash");

describe("hash", () => {
  test("returns a sha256 hash", () => {
    expect(hash("moo")).toEqual(
      "47dfae9288abf3d5d2252abfb0bd6ac9662637d646e6df9d5d274bc336e27abc"
    );
  });
});
