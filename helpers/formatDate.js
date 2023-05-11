const moment = require("moment");

function formatMessage(profileName, text) {
  return {
    profileName,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
