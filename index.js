var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
var utc = require('dayjs/plugin/utc');

dayjs.extend(customParseFormat);
dayjs.extend(utc);

var dateFormatLocal = 'H:mm:ss D/MM/YYYY';
var dateFormatUtc = 'H:mm:ss D/MM/YYYY Z';
var conversionFactors = {
  seconds: 86400,
  minutes: 1440,
  hours: 24,
  days: 1,
  years: 1/365
};

// Helper function - NaN is the only thing not equal to itself in javascript
function isNaN(num) {
  return num !== num;
}

// Assume the date has UTC information at first
// If this is missing (or the date is otherwise invalid), it will return NaN for the $D property
// In this case, parse the date in local time
function parseDate(date) {
  var dateObj = dayjs(date, dateFormatUtc);
  
  if (isNaN(dateObj.$D)) {
    dateObj = dayjs(date, dateFormatLocal);
  }

  return dateObj.utc();
}

function convertDaysTo(days, convertTo) {
  if (conversionFactors[convertTo] === undefined) {
    throw new Error('Unknown conversion unit specified: ' + convertTo);
  } else {
    return days * conversionFactors[convertTo];
  }
}

function daysBetween(a, b, convertTo = 'days') {
  var dateA = parseDate(a);
  var dateB = parseDate(b);

  var days = Math.abs(dateA.diff(dateB, 'day'));

  return convertDaysTo(days, convertTo);
}

function weeksBetween(a, b, convertTo = 'weeks') {
  var dateA = parseDate(a);
  var dateB = parseDate(b);
  var weeks = Math.abs(dateA.diff(dateB, 'week'));
  var daysInAWeek = 7;

  return convertTo === 'weeks' ? weeks
    : convertDaysTo(weeks * daysInAWeek, convertTo);
}

function weekendDaysBetween(a, b) {
  var dateAWeekStart = parseDate(a).startOf('week');
  var dateBWeekStart = parseDate(b).startOf('week').utc();
  var weekendDaysPerWeek = 2;

  return Math.abs(dateAWeekStart.diff(dateBWeekStart, 'week')) * weekendDaysPerWeek;
}

function weekdaysBetween(a, b, convertTo = 'days') {
  var weekdays = daysBetween(a, b) - weekendDaysBetween(a, b);
  
  return convertDaysTo(weekdays, convertTo);
}

module.exports = {daysBetween, weeksBetween, weekdaysBetween};