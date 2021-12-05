const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const depthReport = inputReader.readNumerical(path.join(__dirname, 'input.txt'));

let previousMeasurement;
let depthIncrease = 0;

depthReport.forEach(measurement => {
  if(typeof previousMeasurement !== 'undefined' &&
    previousMeasurement < measurement) {
    depthIncrease += 1;
  }

  previousMeasurement = measurement;
});

console.log(depthIncrease);
