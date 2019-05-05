let localConfig;

try {
  // eslint-disable-next-line
  localConfig = require("./config.local");
} catch (err) {
  localConfig = { api: {} };
}

module.exports = {
  /* Merge with the local config, e.g. API keys */
  ...localConfig,

  /* Base URL on where the app is hosted */
  baseUrl: "https://tips.darekkay.com",

  /* Feed author information */
  author: {
    name: "Darek Kay",
    email: "hello@darekkay.com",
    link: "https://darekkay.com"
  }
};
