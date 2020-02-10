var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

var dateFormat = 'H:mm:ss D/MM/YYYY';

function daysBetween(a, b) {
  var dateA = dayjs(a, dateFormat);
  var dateB = dayjs(b, dateFormat);

  // Return the absolute number of days
  // - spec does not as
  return Math.abs(dateA.diff(dateB, 'day'));
}

module.exports = {daysBetween};