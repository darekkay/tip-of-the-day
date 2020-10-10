const axios = require("axios");

const normalizeContent = (content) => content.replace(/\r?\n|\r/g, "");

const extractEntries = (data) => {
  const { edges } = data.result.data.allKontentItemArticle;
  return edges
    .map((edge) => edge.node.elements)
    .map((element) => ({
      id: element.url_slug.value,
      title: element.name.value,
      description: element.when_useful.value,
      category: element.category.value[0].name,
      content: normalizeContent(element.content.value),
      iconUrl: element.icon.value[0].url,
    }));
};

const run = () =>
  axios
    .get("https://untools.co/page-data/index/page-data.json")
    .then((response) => ({
      title: "Untools",
      id: "untools-en",
      source: "https://untools.co",
      copyright: {
        name: "Adam Amran",
        url: "https://amran.cz/",
      },
      entries: extractEntries(response.data),
    }));

module.exports = {
  run,
};
