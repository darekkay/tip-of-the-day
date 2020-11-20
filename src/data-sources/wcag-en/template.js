const renderItemContent = require("../../utils/ejs");

const renderItem = (data) => {
  const url = `https://www.w3.org/WAI/WCAG21/Understanding/${data.id}.html`;
  return {
    title: `${data.number} ${data.headline} (Level ${data.level})`,
    url,
    content: renderItemContent({ path: __dirname, item: { url, ...data } }),
  };
};

module.exports = {
  renderItem,
};
