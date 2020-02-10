const dapi = require('../index.js');

// Days between two parameters

// Define some test variables in format H:mm:ss D/MM/YYYY
// Arbitrary formats can be parsed by dayjs customParseFormat plugin: https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#customparseformat

const today="12:00:00 9/02/2020";
const tomorrow = "12:00:00 10/02/2020";
const notQuiteTomorrow = "11:59:59 10/02/2020";
const lastYear = "12:00:00 9/02/2019";

test('1 day between today and tomorrow', () => {
  expect(dapi.daysBetween(today, tomorrow)).toBe(1);
});

test('0 days between today and 1 second before tomorrow', () => {
  expect(dapi.daysBetween(today, notQuiteTomorrow)).toBe(0);
});

test('365 days in a year', () => {
  expect(dapi.daysBetween(today, lastYear)).toBe(365);
});

test('Days between: order of dates does not change result', () => {
  expect(dapi.daysBetween(today, tomorrow)).toBe(dapi.daysBetween(tomorrow, today));
});

// Weeks between two parameters
const monday = "12:00:00 3/02/2020";
const friday = "12:00:00 7/02/2020";
const wednesdayNextWeek = "12:00:00 12/02/2020";
const wednesdayTwoWeeksLater = "12:00:00 19/02/2020";
const christmas = "12:00:00 25/12/2019";
const australiaDay = "12:00:00 26/01/2020";

test('0 weeks from Monday to Friday', () => {
  expect(dapi.weeksBetween(monday, friday)).toBe(0);
});

test('0 weeks from Friday to Wednesday next week', () => {
  expect(dapi.weeksBetween(friday, wednesdayNextWeek)).toBe(0);
});

test('2 weeks from Monday to Wednesday in two weeks', () => {
  expect(dapi.weeksBetween(monday, wednesdayTwoWeeksLater)).toBe(2);
});

test('4 weeks from Christmas to Australia Day', () => {
  expect(dapi.weeksBetween(christmas, australiaDay)).toBe(4);
});

test('Weeks between: order of dates does not change result', () => {
  expect(dapi.daysBetween(today, lastYear)).toBe(dapi.daysBetween(lastYear, today));
});