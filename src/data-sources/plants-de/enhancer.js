const axios = require("axios");
const _ = require("lodash");

const config = require("../../config");

const enhance = entry =>
  axios
    .get(
      encodeURI(
        `https://www.smagy.de/service/plantInfo.php?in_data_type=1&in_data=${entry}&out_data=3&cust_id=${config.api.smagy}`
      )
    )
    .then(response => {
      const entryData = _.get(response, "data.plants.plant_1");
      return {
        id: entryData.basicData.id,
        name: entryData.basicData.name,
        ...entryData
      };
    });

module.exports = enhance;
