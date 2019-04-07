const _ = require("lodash");
const { Feed } = require("feed");

const { hash } = require("../utils/hash");
const { selectByDate } = require("../utils/select");

const { baseUrl, author } = require("../config");

const generateRSS = ({ source, renderer, date }) => {
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

  if (_.isEmpty(source.entries))
    throw new Error(`Missing entries for source '${source.id}'`);

  const entry = selectByDate(source.entries, date);
  const rendered = renderer(entry);
  feed.addItem({
    title: rendered.title,
    content: rendered.content,
    id: hash(`${source.id}${date}`),
    date,
    link: `${source.source}/html/${source.id}.html`
  });
  return {
    type: "rss",
    extension: "xml",
    content: feed.atom1()
  };
};

module.exports = generateRSS;
