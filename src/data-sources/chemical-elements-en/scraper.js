const axios = require("axios");
const _ = require("lodash");

const getLanguage = lang =>
  axios.get(
    `https://raw.githubusercontent.com/briandfoy/perl6-chemistry-elements/master/lib/Chemistry/Languages/${lang}.txt`
  );

const run = () =>
  Promise.all([
    axios.get(
      "https://raw.githubusercontent.com/pulsardev/mendelable/master/src/assets/data/mendelable.json"
    ),
    getLanguage("pigLatin"),
    getLanguage("de")
  ]).then(([{ data }, langLatin, langDE]) => ({
    title: "Chemical elements",
    id: "chemical-elements-en",
    source: "https://tips.darekkay.com",
    entries: _.zipWith(
      Object.values(data.default),
      langLatin.data.split("\n"),
      langDE.data.split("\n"),
      (item, nameLatin, nameDE) => ({
        ...item,
        nameLatin,
        nameDE
      })
    )
  }));

module.exports = {
  run
};
