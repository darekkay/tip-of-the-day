const _ = require("lodash");

const countries = require("world-countries");
const currencies = require("@umpirsky/currency-list/data/en/currency.json");
const abbreviations = require("country-json/src/country-by-abbreviation");
const flags = require("country-json/src/country-by-flag");

const flagByAbbreviation = (abbreviation) => {
  const country = abbreviations.find(
    (element) => element.abbreviation === abbreviation
  );

  if (country === undefined) {
    console.info(`No country found for ${abbreviation}`);
    return undefined;
  }

  const flag = flags.find((element) => element.country === country.country);
  if (flag === undefined) {
    console.info(`No flag found for ${abbreviation} (${country.country})`);
    return undefined;
  }

  return flag.flag_base64;
};

const run = () =>
  Promise.resolve({
    title: "World countries",
    id: "countries-en",
    source: "https://tips.darekkay.com",
    entries: countries.map((country) => ({
      name: _.get(country, "name.common"),
      capital: _.get(country, "capital[0]"),
      countryCode: _.get(country, "cca2"),
      currency: currencies[_.get(country, "currency[0]")],
      languages: Object.values(country.languages).join(", "),
      tld: _.get(country, "tld[0]"),
      flag: flagByAbbreviation(_.get(country, "cca2")),
    })),
  });

module.exports = {
  run,
};
