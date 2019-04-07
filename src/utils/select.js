const random = require("shuffle-seed");

const randomSeed = "moo";

const selectByDate = (tips, date) => {
  const daysSince1970 = Math.floor(date / 8.64e7);
  return random.shuffle(tips, randomSeed)[daysSince1970 % tips.length];
};

module.exports = {
  selectByDate
};
