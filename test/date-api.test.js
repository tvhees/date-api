const dapi = require('../index.js');

// Days between two parameters

// Define some test variables in format H:mm:ss D/MM/YYYY
// Arbitrary formats can be parsed by dayjs customParseFormat plugin: https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#customparseformat

const sunday="12:00:00 9/02/2020";
const monday = "12:00:00 10/02/2020";
const notQuiteMonday = "11:59:59 10/02/2020";
const lastYear = "12:00:00 9/02/2019";
const firstFebLeapYear = "12:00:00 1/02/2020";
const firstMarchLeapYear = "12:00:00 1/03/2020";

test('1 day between sunday and monday', () => {
  expect(dapi.daysBetween(sunday, monday)).toBe(1);
});

test('0 days in just less than a day', () => {
  expect(dapi.daysBetween(sunday, notQuiteMonday)).toBe(0);
});

test('365 days in a year', () => {
  expect(dapi.daysBetween(sunday, lastYear)).toBe(365);
});

test('29 days in february of a leap year', () => {
  expect(dapi.daysBetween(firstFebLeapYear, firstMarchLeapYear)).toBe(29);
});

test('Days between: order of dates does not change result', () => {
  expect(dapi.daysBetween(sunday, monday)).toBe(dapi.daysBetween(monday, sunday));
});

// Weeks between two parameters
const friday = "12:00:00 14/02/2020";
const wednesdayNextWeek = "12:00:00 19/02/2020";
const wednesdayTwoWeeksLater = "12:00:00 26/02/2020";
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
  expect(dapi.daysBetween(sunday, lastYear)).toBe(dapi.daysBetween(lastYear, sunday));
});

// Weekdays between two parameters
test('4 weekdays from Monday to Friday', () => {
  expect(dapi.weekdaysBetween(monday, friday)).toBe(4);
});

test('3 weekdays from Friday to Wednesday next week', () => {
  expect(dapi.weekdaysBetween(friday, wednesdayNextWeek)).toBe(3);
});

test('12 weekdays from Monday to Wednesday in two weeks', () => {
  expect(dapi.weekdaysBetween(monday, wednesdayTwoWeeksLater)).toBe(12);
});

test('22 weekdays from Christmas to Australia Day', () => {
  expect(dapi.weekdaysBetween(christmas, australiaDay)).toBe(22);
});

test('Weekdays between: order of dates does not change result', () => {
  expect(dapi.weekdaysBetween(sunday, lastYear)).toBe(dapi.weekdaysBetween(lastYear, sunday));
});

// Conversion to other units
test('86400 seconds between sunday and monday', () => {
  expect(dapi.daysBetween(sunday, monday, 'seconds')).toBe(86400);
});

test('1140 minutes between sunday and monday', () => {
  expect(dapi.daysBetween(sunday, monday, 'minutes')).toBe(1440);
});

test('8760 hours in a year', () => {
  expect(dapi.daysBetween(sunday, lastYear, 'hours')).toBe(8760);
});

test('41760 minutes in february of a leap year', () => {
  expect(dapi.daysBetween(firstFebLeapYear, firstMarchLeapYear, 'minutes')).toBe(41760);
});

test('1209600 seconds in complete weeks from Monday to Wednesday in two weeks', () => {
  expect(dapi.weeksBetween(monday, wednesdayTwoWeeksLater, 'seconds')).toBe(1209600);
});

test('Approximately 0.06 years from Christmas to Australia Day', () => {
  expect(dapi.weekdaysBetween(christmas, australiaDay, 'years')).toBeCloseTo(0.06);
});

test('Unknown conversion unit throws error', () => {
  expect(() => dapi.weekdaysBetween(christmas, australiaDay, 'turtles')).toThrow(Error);
});

// Timezone adjustment
const sundayAdelaide= "12:00:00 9/02/2020 +10:30";
const wednesdayAdelaide = "12:00:00 12/02/2020 +10:30";
const sundayUsEast = "12:00:00 9/02/2020 -05:00";
const wednesdayUsEast = "12:00:00 12/02/2020 -05:00";

test('3 days between sunday and wednesday in Adelaide', () => {
  expect(dapi.daysBetween(sundayAdelaide, wednesdayAdelaide)).toBe(3);
});

test('3 days between sunday and wednesday in US East', () => {
  expect(dapi.daysBetween(sundayUsEast, wednesdayUsEast)).toBe(3);
});

test('3 days between sunday in Adelaide and wednesday in USEast', () => {
  expect(dapi.daysBetween(sundayAdelaide, wednesdayUsEast)).toBe(3);
});

test('2 days between sunday in USeast and wednesday in Adelaide', () => {
  expect(dapi.daysBetween(sundayUsEast, wednesdayAdelaide)).toBe(2);
});