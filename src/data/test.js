const fs = require('fs');
const { countryNames } = require('./countries.ts');

fs.writeFileSync('./countries.json', JSON.stringify(countryNames));
