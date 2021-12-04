const fileSync = require('fs');
const path = require('path');
const input = fileSync.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const depthReport = input.split('\n').map(entry => parseInt(entry, 10));

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
