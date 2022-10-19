/**
 * Generate all pages for every data source.
 */
const { join, basename } = require("path");

const { ensureFile, writeFile, readFile } = require("fs-extra");
const _ = require("lodash");

const getRenderer = require("../src/render");
const generateHTML = require("../src/formats/html");
const dataSources = require("../src/data-sources/index.json");

const dataSourcesPath = join(__dirname, "..", "src", "data-sources");

const writeEnsureFile = (path, content) =>
  ensureFile(path).then(() => writeFile(path, content));

const readDataSource = (file) =>
  readFile(join(dataSourcesPath, file, "data.json"), "utf-8");

const writeFeed = (file, type, content) =>
  writeEnsureFile(join(__dirname, "..", "build", type, file), content);

const outputFileName = (file, extension) =>
  `${basename(file, ".json")}.${extension}`;

dataSources.forEach((dataSource) => {
  readDataSource(dataSource.slug)
    .then((dataSourceContent) => {
      const source = JSON.parse(dataSourceContent);
      if (_.isEmpty(source.entries))
        throw new Error(`Missing entries for source '${source.id}'`);
      return source.entries.map((entry) => ({
        source,
        entry,
        renderer: getRenderer(dataSource.slug),
      }));
    })
    .then((tips) =>
      Promise.all(tips.map((tip) => Promise.resolve(generateHTML(tip))))
    )
    .then((feeds) =>
      Promise.all(
        feeds.map((feed, index) =>
          writeFeed(
            outputFileName(`${dataSource.slug}-${index}`, feed.extension),
            feed.type,
            feed.content
          )
        )
      )
    );
});
