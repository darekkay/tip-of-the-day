const axios = require("axios");
const _ = require("lodash");
const jsdom = require("jsdom");

// locally saved/scraped files
const getPage = id => axios.get(`http://localhost:8080/${id}/index.html`);

const scrapeContent = html => {
  const dom = new jsdom.JSDOM(html);
  const image = dom.window.document.querySelector("#comic img");
  const metaContent = dom.window.document.querySelector(
    "meta[property='og:url'"
  );

  if (image === null || metaContent === null) {
    console.error(`Could not parse page`);
    return null;
  }

  const pageUrl = metaContent.content;
  return {
    id: pageUrl.substring(17, pageUrl.length - 1),
    title: image.alt,
    imageUrl: image.src,
    description: image.title
  };
};

const run = () =>
  Promise.all(
    _.range(0, 2256)
      .filter(id => id !== 404 && id !== 1663)
      .map(id => getPage(id))
  ).then(results => {
    return {
      title: "XKCD",
      id: "xkcd-en",
      source: "https://www.xkcd.com/",
      license: {
        name: "CC BY-NC 2.5",
        url: "https://creativecommons.org/licenses/by-nc/2.5/",
        author: "Randall Munroe"
      },
      entries: results
        .reduce((acc, result) => [...acc, scrapeContent(result.data)], [])
        .filter(result => result !== null)
    };
  });

module.exports = {
  run
};
