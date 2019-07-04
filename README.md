# tardis
A simple time date converter and formatter supporting Unix timestap and ISO 8601


# Install

 
Include tardis.js in your build or link to it from you html
 



# Usage

```javascript
const tardis = require('lbx-tardis')

const getDate = tardis.dateparts() // { year: 119, month: 6, day: 29, hour: 13, min: '04', sec: '12', fullYear: 2019, shortYear: '19', wordYear: 'two thousand and nineteen',  fullMonth: 'June',  shortMonth: 'Jun',....}

const getISO = tardis.ISO() // 2019-06-29

const getTimeStamp = tardis.patterned(1133481000, 'M/DD/YYYY - H:I:s TT tt'); // { pattern: '12/02/2005 - 18:50:{{26}} PM pm', time: 1133481000 }

const getTime = tardis.patterned('2019-06-29T17:26:43', 'M/DD/YYYY - HH:II:SS tt'); //{ pattern: '6/30/2019 - 18:26:43 pm', time: '2019-06-29T17:26:43' }

```
 Full [filter patterns here and presets](https://docs.google.com/spreadsheets/d/1SVNrBFcKqkojN59xQNyeA3mvNxvX8pwgXzKj9JABAtw/edit#gid=0)

# Contributing

In case you notice a bug, please open an issue mentioning the input that has caused an incorrect conversion.


## Authors

* **Mike McAllister** - *Initial work* - [mjm1374](https://github.com/mjm1374)

## Acknowledgments

* Salman Mitha @ [num-words ](https://github.com/salmanm/num-words)
* Barmar @ [replaceAll regex](https://stackoverflow.com/users/1491895/barmar)

