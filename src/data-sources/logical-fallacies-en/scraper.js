const axios = require("axios");

const run = () =>
  axios
    .get("https://yourlogicalfallacyis.com/js/data/fallacies.json")
    .then(response => ({
      title: "Logical fallacies",
      id: "logical-fallacies-en",
      source: "https://yourlogicalfallacyis.com",
      entries: response.data
    }));

module.exports = {
  run
};
