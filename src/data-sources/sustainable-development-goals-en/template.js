const renderItemContent = require("../../utils/ejs");

const renderItem = (data) => ({
  title: data.title,
  url: `https://www.globalgoals.org/${data.number}-${data.slug}`,
  content: renderItemContent({ path: __dirname, item: data }),
});

module.exports = {
  renderItem,
};
