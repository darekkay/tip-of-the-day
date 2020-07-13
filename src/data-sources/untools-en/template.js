const renderItemContent = require("../../utils/ejs");

const renderItem = data => ({
  title: `${data.title} (${data.category.toLowerCase()})`,
  url: `https://untools.co/${data.id}`,
  content: renderItemContent({ path: __dirname, item: data })
});

module.exports = {
  renderItem
};
