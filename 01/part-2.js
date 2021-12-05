const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const depthReport = inputReader.readNumerical(path.join(__dirname, 'input.txt'));

let processedReport = [];
for(i = 0; i <= depthReport.length; i++) {
  let measurementWindow = depthReport[i] + depthReport[i+1] + depthReport[i+2];
  processedReport.push(measurementWindow);
}

let previousMeasurement;
let depthIncrease = 0;

processedReport.forEach(measurement => {
  if(typeof previousMeasurement !== 'undefined' &&
    previousMeasurement < measurement) {
    depthIncrease += 1;
  }

  previousMeasurement = measurement;
});

console.log(depthIncrease);
