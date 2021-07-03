const _ = require("lodash");
const logger = require("@darekkay/logger");
const countries = require("world-countries");
const currencies = require("@umpirsky/currency-list/data/en/currency.json");
const abbreviations = require("country-json/src/country-by-abbreviation");
const isoCodes = require("country-json/src/country-by-iso-numeric.json");
const flags = require("country-json/src/country-by-flag");

const getFlag = (icoCode, abbreviation) => {
  // Go with the ISO code first, use country abbreviation as a fallback
  // This is mostly a workaround for UK <> GB
  const countryByIsoCode = isoCodes.find(
    (entry) => entry.iso === parseInt(icoCode, 10)
  );
  const countryByAbbreviation = abbreviations.find(
    (entry) => entry.abbreviation === abbreviation
  );

  if (countryByIsoCode === undefined && countryByAbbreviation === undefined) {
    logger.warn(`No country found for ${icoCode} [${abbreviation}]`);
    return null;
  }

  const country = countryByIsoCode || countryByAbbreviation;

  const flag = flags.find((element) => element.country === country.country);
  if (flag === undefined || flag.flag_base64 === null) {
    logger.warn(`No flag found for ${icoCode} (${country.country})`);
    return null;
  }

  return flag.flag_base64;
};

const run = () =>
  Promise.resolve({
    title: "World countries",
    id: "countries-en",
    source: "https://tips.darekkay.com",
    entries: countries
      .map((country) => ({
        name: _.get(country, "name.common"),
        capital: _.get(country, "capital[0]"),
        countryCode: _.get(country, "cca2"),
        currency: currencies[_.get(country, "currency[0]")],
        languages: Object.values(country.languages).join(", "),
        tld: _.get(country, "tld[0]"),
        flag: getFlag(_.get(country, "ccn3"), _.get(country, "cca2")),
      }))
      .filter((country) => !!country.flag)
      .filter((country) => !!country.capital),
  });

module.exports = {
  run,
};
