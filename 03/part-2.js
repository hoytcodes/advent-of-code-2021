const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const diagnosticReport = inputReader.read(path.join(__dirname, 'input.txt'));

function determineRating(array, defaultBit) {
  const [commonBit, uncommonBit] = defaultBit === '1' ? ['1', '0'] : ['0', '1'];

  let ratingArray = array;
  let i = 0;

  while(ratingArray.length > 1) {
    let bitOneCount = ratingArray.reduce((count, value) => {
      return value.substring(i, i + 1) === '1' ? count + 1 : count }, 0);
    let bitZeroCount = ratingArray.reduce((count, value) => {
      return value.substring(i, i + 1) === '0' ? count + 1 : count }, 0);

    if(bitZeroCount > bitOneCount) {
      ratingArray = ratingArray.filter(entry => { return entry.substring(i, i + 1) === uncommonBit });
      i += 1;
      continue;
    }

    if(bitOneCount > bitZeroCount || bitOneCount === bitZeroCount) {
      ratingArray = ratingArray.filter(entry => { return entry.substring(i, i + 1) === commonBit });
      i += 1;
      continue;
    }
  }

  return ratingArray[0];
}

oxygenGenerator = determineRating(diagnosticReport, '1');
co2Scrubber = determineRating(diagnosticReport, '0');

console.log(parseInt(oxygenGenerator, 2) * parseInt(co2Scrubber, 2));
