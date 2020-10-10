const axios = require("axios");
const markdown = require("markdown-it")({
  html: true, // enable HTML tags in source
});

const decodeHTML = (html) => html.replace("&amp;", "&");

const extractEntries = (data) => {
  // render content as HTML
  let html = markdown.render(data);

  // remove line breaks
  html = html.replace(/\r?\n|\r/g, "");

  // TODO: use absolute image paths
  html = html.replace(
    /\.\/images\//g,
    "https://github.com/dwmkerr/hacker-laws/raw/master/images/"
  );

  let entries = html.split("<h3>");

  // strip everything before the first headline
  entries.shift();

  // strip section headlines
  entries = entries.map((entry) => {
    const headlineIndex = entry.indexOf("<h2>");
    return headlineIndex >= 0 ? entry.substring(0, headlineIndex) : entry;
  });

  // map entries into the TOTD format
  return entries.map((entry) => {
    const headlineEndTag = "</h3>";
    const headlineEndIndex = entry.indexOf(headlineEndTag);
    return {
      title: decodeHTML(entry.substring(0, headlineEndIndex)),
      content: entry.substring(headlineEndIndex + headlineEndTag.length),
    };
  });
};

const run = () =>
  axios
    .get(
      "https://raw.githubusercontent.com/dwmkerr/hacker-laws/master/README.md"
    )
    .then((response) => ({
      title: "Hacker Laws",
      id: "hacker-laws-en",
      source: "https://github.com/dwmkerr/hacker-laws",
      license: {
        name: "CC BY-SA 4.0",
        url: "https://github.com/dwmkerr/hacker-laws/blob/master/LICENSE",
        author: "Dave Kerr",
      },
      entries: extractEntries(response.data),
    }));

module.exports = {
  run,
};
