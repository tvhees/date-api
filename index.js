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

function weekendDaysBetween(a, b) {
  var dateAWeekStart = dayjs(a, dateFormat).startOf('week');
  var dateBWeekStart = dayjs(b, dateFormat).startOf('week');
  var weekendDaysPerWeek = 2;

  return Math.abs(dateAWeekStart.diff(dateBWeekStart, 'week')) * weekendDaysPerWeek;
}

function weekdaysBetween(a, b) {
  return daysBetween(a, b) - weekendDaysBetween(a, b);
}

module.exports = {daysBetween, weeksBetween, weekdaysBetween};