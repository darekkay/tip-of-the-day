const { selectByDate } = require("../utils/select");
const renderTemplate = require("../utils/ejs");

const generateHTML = ({ source, renderer, date }) => {
  const entry = selectByDate(source.entries, date);
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
        source: rendered.url
      }
    })
  };
};

module.exports = generateHTML;
