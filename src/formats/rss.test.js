/* eslint-disable no-unused-expressions,no-underscore-dangle */

const { expect } = require("chai");
const _ = require("lodash");
const moment = require("moment");
const parser = require("xml-js");

const config = require("../config");
const generateRSS = require("./rss.js");

const mockDate = moment("2018-01-02T03:04:05Z").toDate();

describe("generate RSS", () => {
  const generateAsJSON = ({ numberOfEntries }) => {
    const feed = generateRSS({
      date: mockDate,
      renderer: _.identity,
      source: {
        id: "mock",
        title: "feed title",
        entries: _.range(1, numberOfEntries + 1).map(index => ({
          title: `entry title ${index}`,
          content: `content ${index}`
        }))
      },
      entry: {
        title: `entry title 1`,
        content: `content 1`
      }
    }).content;
    return JSON.parse(parser.xml2json(feed, { compact: true }));
  };

  it("sets general feed properties", () => {
    const { feed } = generateAsJSON({
      numberOfEntries: 1
    });

    expect(feed.id._text).to.equal(`${config.baseUrl}/rss/mock.xml`);
    expect(feed.title._text).to.equal("feed title");
    expect(feed.author).to.be.not.empty;
    expect(feed.updated._text).to.equal("2018-01-02T03:04:05.000Z");
    expect(feed.entry).to.be.a("object");
    expect(feed.entry.id._text).to.be.not.undefined;
  });

  it("throws an error if the source contains no entries", () => {
    const feed = () =>
      generateAsJSON({
        numberOfEntries: 0
      });
    expect(feed).to.throw;
  });
});
