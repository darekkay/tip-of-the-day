const generateJSON = ({ entry }) => {
  return {
    type: "json",
    extension: "json",
    content: JSON.stringify(entry, null, 2)
  };
};

module.exports = generateJSON;
