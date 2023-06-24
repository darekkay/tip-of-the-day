const { join } = require("path");

const { readFileSync } = require("fs-extra");
const ejs = require("ejs");

const renderTemplate = ({ path, fileName = "template.ejs", item }) => {
  const template = readFileSync(join(path, fileName), "utf8");
  return ejs.render(template, item, { filename: join(path, fileName) });
};

module.exports = renderTemplate;
