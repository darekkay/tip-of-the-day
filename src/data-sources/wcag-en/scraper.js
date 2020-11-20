const axios = require("axios");

const extractDetails = (rawDetails = []) => {
  const details = [];
  rawDetails.forEach((detail) => {
    if (detail.items) {
      extractDetails(detail.items).forEach((items) => details.push(items));
    } else if (detail.handle) {
      details.push(`<strong>${detail.handle}</strong>: ${detail.text}`);
    } else {
      details.push(detail.text);
    }
  });
  return details;
};

const extractSuccessCriteria = (data) => {
  return data.principles.reduce((accumulator, principle) => {
    principle.guidelines.forEach((guideline) => {
      guideline.successcriteria.forEach((criteria) => {
        const id = criteria.id.substring(criteria.id.indexOf(":") + 1);
        accumulator.push({
          id,
          number: criteria.num,
          headline: criteria.handle,
          description: criteria.title,
          level: criteria.level,
          details: extractDetails(criteria.details),
        });
      });
    });
    return accumulator;
  }, []);
};

const run = () =>
  axios
    .get(
      "https://raw.githubusercontent.com/w3c/wai-wcag-quickref/gh-pages/_data/wcag21.json"
    )
    .then((response) => ({
      title: "Web Content Accessibility Guidelines 2.1",
      id: "wcag-en",
      source: "https://github.com/w3c/wai-wcag-quickref",
      license: {
        name: "W3C Document License",
        url: "https://www.w3.org/Consortium/Legal/2015/doc-license",
        author: "World Wide Web Consortium, (MIT, ERCIM, Keio, Beihang).",
      },
      entries: extractSuccessCriteria(response.data),
    }));

module.exports = {
  run,
};
