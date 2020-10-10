const renderItemContent = require("../../utils/ejs");

const renderItem = (element) => ({
  title: element.name,
  content: renderItemContent({ path: __dirname, item: element }),
});

module.exports = {
  renderItem,
};
