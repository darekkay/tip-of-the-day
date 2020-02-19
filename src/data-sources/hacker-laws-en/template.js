const renderItemContent = require("../../utils/ejs");

const renderItem = data => ({
  title: data.title,
  url: "https://github.com/dwmkerr/hacker-laws/blob/master/README.md",
  content: renderItemContent({ path: __dirname, item: data })
});

module.exports = {
  renderItem
};
