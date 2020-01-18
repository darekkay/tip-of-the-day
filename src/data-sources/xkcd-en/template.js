const renderItemContent = require("../../utils/ejs");

const renderItem = data => ({
  title: data.title,
  content: renderItemContent({ path: __dirname, item: data })
});

module.exports = {
  renderItem
};
