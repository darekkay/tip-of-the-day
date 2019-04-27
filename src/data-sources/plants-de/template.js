const renderItemContent = require("../../utils/ejs");

const renderItem = data => ({
  title: data.name,
  url: `https://www.smagy.de/index.php?func=plant&task=showPlant&taskID=${
    data.id
  }`,
  content: renderItemContent({ path: __dirname, item: data })
});

module.exports = {
  renderItem
};
