const { join } = require("path");

const axios = require("axios");
const { readFileSync } = require("fs-extra");
const _ = require("lodash");

const backgroundColors = {
  1: "#e5243b",
  2: "#dda63a",
  3: "#4c9f38",
  4: "#c5192d",
  5: "#ff3a21",
  6: "#26bde2",
  7: "#fcc30b",
  8: "#a21942",
  9: "#fd6925",
  10: "#dd1367",
  11: "#fd9d24",
  12: "#bf8b2e",
  13: "#3f7e44",
  14: "#0a97d9",
  15: "#56c02b",
  16: "#00689d",
  17: "#19486a"
};

const images = _.range(1, 18).map(number =>
  readFileSync(join(__dirname, "svg", `goal-${number}.svg`), "utf-8")
);

const extractEntries = data => {
  return _.orderBy(
    data.results.map(result => result.data),
    entry => entry.number
  ).map(result => ({
    title: result.title[0].text,
    slug: result.slug,
    number: result.number,
    backgroundColor: backgroundColors[result.number],
    image: images[result.number],
    introduction: result.introduction[0].text,
    manifest: result.manifest[0].text,
    targets: result.targets.map(target => ({
      title: target.title[0].text,
      body: target.body[0].text,
      pictogram: target.pictogram.url
    })),
    tips: result.tips.map(tip => tip.text[0].text)
  }));
};

const run = () =>
  axios
    .get(
      "https://globalgoals.cdn.prismic.io/api/v2/documents/search?ref=XkUcUxAAACcAVT_P&q=%5B%5Bat(document.type%2C%22goal%22)%5D%5D"
    )
    .then(response => ({
      title: "Sustainable Development Goals",
      id: "sustainable-development-goals-en",
      source: "https://www.globalgoals.org/",
      license: {
        name: "CC BY 4.0",
        url: "https://creativecommons.org/licenses/by/4.0/",
        author: "United Nations"
      },
      entries: extractEntries(response.data)
    }));

module.exports = {
  run
};
