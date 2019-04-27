const { ensureFile, writeFile, readFile } = require("fs-extra");
const { join, basename } = require("path");
const moment = require("moment");

const getRenderer = require("./render");
const generateRSS = require("./formats/rss");
const generateJSON = require("./formats/json");
const generateHTML = require("./formats/html");
const { selectByDate } = require("./utils/select");

const dataSources = require("./data-sources/index.json");

const generateAllFeeds = date => {
  const dataSourcesPath = join(__dirname, "data-sources");

  const writeEnsureFile = (path, content) =>
    ensureFile(path).then(() => writeFile(path, content));

  const readDataSource = file =>
    readFile(join(dataSourcesPath, file, "data.json"), "utf-8");

  const writeFeed = (file, type, content) =>
    writeEnsureFile(join(__dirname, "..", "build", type, file), content);

  const outputFileName = (file, extension) =>
    `${basename(file, ".json")}.${extension}`;

  const transformFile = filename =>
    readDataSource(filename)
      .then(dataSource => {
        const source = JSON.parse(dataSource);
        return {
          date,
          source,
          entry: selectByDate(source.entries, date),
          renderer: getRenderer(filename)
        };
      })
      .then(props =>
        Promise.all([
          Promise.resolve(generateRSS(props)),
          Promise.resolve(generateJSON(props)),
          Promise.resolve(generateHTML(props))
        ])
      )
      .then(feeds =>
        Promise.all(
          feeds.map(feed =>
            writeFeed(
              outputFileName(filename, feed.extension),
              feed.type,
              feed.content
            )
          )
        )
      )
      .then(() => console.log(`Generated feed for ${filename}`));

  Promise.all(dataSources.map(source => transformFile(source.slug))).catch(
    console.error
  );
};

const currentDay = moment(new Date())
  .startOf("day")
  .toDate();
generateAllFeeds(currentDay);
