const dapi = require('../index.js');

// Define some test variables in format H:mm:ss M/DD/YYYY
// Arbitrary formats can be parsed by dayjs customParseFormat plugin: https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#customparseformat

const today="10:00:00 9/02/2020";
const tomorrow = "10:00:00 10/02/2020";

test('1 day between today and tomorrow', () => {
  expect(dapi.daysBetween(today, tomorrow)).toBe(1);
});