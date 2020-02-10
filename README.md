# date-api
API that returns the difference between two datetime objects.
Author: Torbjorn van Heeswijck

Usage:

Clone repository on a system with NodeJS installed. Run the following command:

```javascript
npm install
```

Import the API for use as follows:

```javascript
const dapi = require('../index.js');
```

The following methods can then be used on the dapi object:

```javascript
dapi.daysBetween('3:42:59 10/02/2020', '12:20:00 15/02/2020') // Returns the number of whole days between two dates

dapi.weeksBetween(dateA, dateB) // Returns the number of whole weeks between two dates

dapi.weekdaysBetween(dateA, dateB) // Returns the number of whole weekdays between two dates
```

Date parameters must be strings in the following format: 'H:mm:ss D/MM/YYYY', e.g. '3:42:59 10/02/2020'

The results can be converted to another unit of time.
Supported units: 'seconds', 'minutes', 'hours', 'years'
```javascript
dapi.daysBetween(dateA, dateB, 'minutes') // Returns the number of whole days between two dates converted to minutes
```

Differing timezones can be adjusted for using UTC offsets:
```javascript
dapi.daysBetween('3:42:59 10/02/2020 +10:30', '12:20:00 15/02/2020 -05:30') // Returns the number of whole days between two dates converted to minutes
```

Tests can be run with the following command:
```javascript
npm run jest
```