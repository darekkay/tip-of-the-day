const { selectByDate } = require("./select.js");

describe("tipOfTheDay", () => {
  const tips = ["one", "two", "three", "four"];
  const day = 1524313323000;

  test("returns the same element for a specific date", () => {
    expect(selectByDate(tips, day)).toEqual("four");
  });

  test("cycles through the elements", () => {
    const randomized = tips.map((value, index) =>
      selectByDate(tips, day + index * 8.64e7)
    );
    expect(randomized.sort()).toEqual(tips.sort());
  });
});
