/* eslint-disable no-unused-expressions,no-underscore-dangle */

const _ = require("lodash");
const moment = require("moment");
const parser = require("xml-js");

const config = require("../config");
const generateRSS = require("./rss.js");

const mockDate = moment("2018-01-02T03:04:05Z").toDate();

describe("generate RSS", () => {
  const generateAsJSON = () => {
    const feed = generateRSS({
      date: mockDate,
      renderer: _.identity,
      source: {
        id: "mock",
        title: "feed title",
      },
      entry: {
        title: `entry title 1`,
        content: `content 1`,
      },
    }).content;
    return JSON.parse(parser.xml2json(feed, { compact: true }));
  };

  test("sets general feed properties", () => {
    const { feed } = generateAsJSON();

    expect(feed.id._text).toBe(`${config.baseUrl}/rss/mock.xml`);
    expect(feed.title._text).toBe("feed title");
    expect(feed.author.email._text).toBe("hello@darekkay.com");
    expect(feed.updated._text).toBe("2018-01-02T03:04:05.000Z");
    expect(typeof feed.entry).toBe("object");
    expect(feed.entry.id._text).toBeDefined();
  });
});
