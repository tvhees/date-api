const dapi = require('../index.js');

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

test('order of dates does not change result', () => {
  expect(dapi.daysBetween(today, tomorrow)).toBe(dapi.daysBetween(tomorrow, today));
});