const getRenderer = (slug) => {
  const template = require(`./data-sources/${slug}/template.js`);
  return template.renderItem;
};

module.exports = getRenderer;
