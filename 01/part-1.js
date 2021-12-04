const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const depthReport = inputReader.readNumerical(path.join(__dirname, 'input.txt'));

// Process the depth report measurements
let previousMeasurement;
let depthIncrease = 0;

depthReport.forEach(measurement => {
  if(typeof previousMeasurement !== undefined &&
    previousMeasurement < measurement) {
    depthIncrease += 1;
  }

  previousMeasurement = measurement;
});

// Write to the console
console.log(depthIncrease);
