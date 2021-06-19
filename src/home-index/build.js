/** Generates an index page for all data sources */

const { join } = require("path");

const { writeFile } = require("fs-extra");

const renderTemplate = require("../utils/ejs");
const dataSources = require("../data-sources/index.json");

const output = renderTemplate({
  path: __dirname,
  item: { sources: dataSources.filter((source) => !source.hidden) },
});

const buildIndex = (callback) =>
  writeFile(join(__dirname, "..", "..", "public", "index.html"), output).then(
    callback()
  );

module.exports = buildIndex;
