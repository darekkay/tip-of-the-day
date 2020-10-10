const _ = require("lodash");

const renderItemContent = require("../../utils/ejs");

const renderItem = (fallacy) => ({
  title: `${_.capitalize(fallacy.title)}`,
  url: `https://yourlogicalfallacyis.com/${fallacy.slug}`,
  content: renderItemContent({ path: __dirname, item: fallacy }),
});

module.exports = {
  renderItem,
};
