const renderTemplate = require("../utils/ejs");

const generateHTML = ({ source, entry, renderer }) => {
  const rendered = renderer(entry);

  return {
    type: "html",
    extension: "html",
    content: renderTemplate({
      path: __dirname,
      fileName: "html-scaffold.ejs",
      item: {
        content: rendered.content,
        title: source.title,
        name: rendered.title,
        source: rendered.url,
        license: source.license
      }
    })
  };
};

module.exports = generateHTML;
