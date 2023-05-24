const moment = require('moment')

export function formatMessage(
  profileName: string | undefined,
  text: string
): any {
  return {
    profileName,
    text,
    time: moment().format('h:mm a'),
  }
}

// module.exports = formatMessage;
