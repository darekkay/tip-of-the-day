/* eslint-disable import/no-dynamic-require,global-require */
const { writeFile } = require("fs-extra");
const { join } = require("path");

const scrape = (slug) => {
  const scraper = require(`./data-sources/${slug}/scraper.js`);
  scraper
    .run()
    .then((content) =>
      writeFile(
        join(__dirname, "data-sources", slug, "data.json"),
        JSON.stringify(content, null, 2)
      )
    )
    .then(() => console.info(`Scraping ${slug} finished.`));
};

// Run scraper manually (maybe move this to npm scripts):

// scrape("chemical-elements-en");
// scrape("countries-en");
// scrape("logical-fallacies-en");
// scrape("xkcd-en");
// scrape("hacker-laws-en");
scrape("untools-en");
// scrape("sustainable-development-goals-en");
