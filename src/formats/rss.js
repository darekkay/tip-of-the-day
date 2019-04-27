const { Feed } = require("feed");

const { hash } = require("../utils/hash");
const { baseUrl, author } = require("../config");

const generateRSS = ({ source, entry, renderer, date }) => {
  const feedUrl = id => `${baseUrl}/${id}.xml`;
  const feed = new Feed({
    title: source.title,

    id: feedUrl(source.id),
    link: feedUrl(source.id),
    generator: baseUrl,
    updated: date,
    feedLinks: {
      atom: feedUrl(source.id)
    },
    author
  });

  const rendered = renderer(entry);
  feed.addItem({
    title: rendered.title,
    content: rendered.content,
    id: hash(`${source.id}${date}`),
    date,
    link: rendered.url || `${baseUrl}/html/${source.id}.html`
  });
  return {
    type: "rss",
    extension: "xml",
    content: feed.atom1()
  };
};

module.exports = generateRSS;
