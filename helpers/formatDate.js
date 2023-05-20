const moment = require("moment");

function formatMessage(profileNameHost, text) {
  return {
    profileNameHost,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
