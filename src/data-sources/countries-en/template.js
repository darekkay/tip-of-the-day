const renderItemContent = require("../../utils/ejs");

const renderItem = (country) => ({
  title: country.name,
  content: renderItemContent({ path: __dirname, item: country }),
});

module.exports = {
  renderItem,
};
