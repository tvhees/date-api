var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

var dateFormat = 'H:mm:ss D/MM/YYYY';

function daysBetween(a, b) {
  var dateA = dayjs(a, dateFormat);
  var dateB = dayjs(b, dateFormat);

  // Return the absolute number of days - spec doesn't require 
  return Math.abs(dateA.diff(dateB, 'day'));
}

function weeksBetween(a, b) {
  var dateA = dayjs(a, dateFormat);
  var dateB = dayjs(b, dateFormat);

  return Math.abs(dateA.diff(dateB, 'week'));
}

module.exports = {daysBetween, weeksBetween};