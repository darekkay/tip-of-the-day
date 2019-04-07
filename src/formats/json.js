const { selectByDate } = require("../utils/select");

const generateJSON = ({ source, date }) => {
  const content = selectByDate(source.entries, date);
  return {
    type: "json",
    extension: "json",
    content: JSON.stringify(content, null, 2)
  };
};

module.exports = generateJSON;
