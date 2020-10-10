const { ensureFile, writeFile, readFile } = require("fs-extra");
const { join, basename } = require("path");
const moment = require("moment");
const _ = require("lodash");
const logger = require("@darekkay/logger");

const getRenderer = require("./render");
const generateRSS = require("./formats/rss");
const generateJSON = require("./formats/json");
const generateHTML = require("./formats/html");
const { selectByDate } = require("./utils/select");

const dataSources = require("./data-sources/index.json");

const generateAllFeeds = (date) => {
  const dataSourcesPath = join(__dirname, "data-sources");

  const writeEnsureFile = (path, content) =>
    ensureFile(path).then(() => writeFile(path, content));

  const readDataSource = (file) =>
    readFile(join(dataSourcesPath, file, "data.json"), "utf-8");

  const writeFeed = (file, type, content) =>
    writeEnsureFile(join(__dirname, "..", "build", type, file), content);

  const outputFileName = (file, extension) =>
    `${basename(file, ".json")}.${extension}`;

  const enhance = (tip) => {
    // custom hook to enrich the data of the selected item
    let enhancer = (value) => Promise.resolve(value);
    try {
      enhancer = require(`./data-sources/${tip.source.id}/enhancer.js`);
    } catch {
      // No enhancer found - using identity as fallback
    }
    return enhancer(tip.entry).then((entry) => ({
      ...tip,
      entry,
    }));
  };

  const transformFile = (filename) =>
    readDataSource(filename)
      .then((dataSource) => {
        const source = JSON.parse(dataSource);
        if (_.isEmpty(source.entries))
          throw new Error(`Missing entries for source '${source.id}'`);
        return {
          date,
          source,
          entry: selectByDate(source.entries, date),
          renderer: getRenderer(filename),
        };
      })
      .then(enhance)
      .then((tip) =>
        Promise.all([
          Promise.resolve(generateRSS(tip)),
          Promise.resolve(generateJSON(tip)),
          Promise.resolve(generateHTML(tip)),
        ])
      )
      .then((feeds) =>
        Promise.all(
          feeds.map((feed) =>
            writeFeed(
              outputFileName(filename, feed.extension),
              feed.type,
              feed.content
            )
          )
        )
      )
      .then(() => logger.info(`Generated feed for ${filename}`));

  Promise.all(dataSources.map((source) => transformFile(source.slug))).catch(
    logger.error
  );
};

const currentDay = moment(new Date()).startOf("day").toDate();
generateAllFeeds(currentDay);
