const renderTemplate = require("../utils/ejs");
const { baseUrl } = require("../config");

const generateHTML = ({ source, entry, renderer }) => {
  const rendered = renderer(entry);

  return {
    type: "html",
    extension: "html",
    content: renderTemplate({
      path: __dirname,
      fileName: "html-scaffold.ejs",
      item: {
        id: source.id,
        content: rendered.content,
        title: source.title,
        name: rendered.title,
        source: rendered.url,
        rssUrl: `${baseUrl}/rss/${source.id}.xml`,
        license: source.license,
        copyright: source.copyright
      }
    })
  };
};

module.exports = generateHTML;
