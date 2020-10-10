const axios = require("axios");

const run = () =>
  axios
    .get("https://yourlogicalfallacyis.com/js/data/fallacies.json")
    .then((response) => ({
      title: "Logical fallacies",
      id: "logical-fallacies-en",
      source: "https://yourlogicalfallacyis.com",
      license: {
        name: "CC BY-NC 4.0",
        url: "https://creativecommons.org/licenses/by-nc/4.0/",
        author: "Jesse Richardson, Andy Smith, Som Meaden, and Flip Creative",
      },
      entries: response.data,
    }));

module.exports = {
  run,
};
