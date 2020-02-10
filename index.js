var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

var dateFormat = 'H:mm:ss D/MM/YYYY';
var conversionFactors = {
  seconds: 86400,
  minutes: 1440,
  hours: 24,
  days: 1,
  years: 1/365
};

function convertDaysTo(days, convertTo) {
  if (conversionFactors[convertTo] === undefined) {
    throw new Error('Unknown conversion unit specified: ' + convertTo);
    return NaN;
  } else {
    return days * conversionFactors[convertTo];
  }
}

function daysBetween(a, b, convertTo = 'days') {
  var dateA = dayjs(a, dateFormat);
  var dateB = dayjs(b, dateFormat);
  var days = Math.abs(dateA.diff(dateB, 'day'));

  return convertDaysTo(days, convertTo);
}

function weeksBetween(a, b, convertTo = 'weeks') {
  var dateA = dayjs(a, dateFormat);
  var dateB = dayjs(b, dateFormat);
  var weeks = Math.abs(dateA.diff(dateB, 'week'));
  var daysInAWeek = 7;

  return convertTo === 'weeks' ? weeks
    : convertDaysTo(weeks * daysInAWeek, convertTo);
}

function weekendDaysBetween(a, b) {
  var dateAWeekStart = dayjs(a, dateFormat).startOf('week');
  var dateBWeekStart = dayjs(b, dateFormat).startOf('week');
  var weekendDaysPerWeek = 2;

  return Math.abs(dateAWeekStart.diff(dateBWeekStart, 'week')) * weekendDaysPerWeek;
}

function weekdaysBetween(a, b, convertTo = 'days') {
  var weekdays = daysBetween(a, b) - weekendDaysBetween(a, b);
  
  return convertDaysTo(weekdays, convertTo);
}

module.exports = {daysBetween, weeksBetween, weekdaysBetween};