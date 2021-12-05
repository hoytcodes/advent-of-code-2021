const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const diagnosticReport = inputReader.read(path.join(__dirname, 'input.txt'));

const bits = [];

for(let entry of diagnosticReport) {
  const entryBits = entry.split('');

  for(i = 0; i < entryBits.length; i++) {
    if(typeof bits[i] === 'undefined') {
      bits.push([]);
    }

    bits[i].push(entryBits[i]);
  }
}

let gammaRate = [];
let epsilonRate = [];

for(let bit of bits) {
  let bitZeroCount = bit.reduce((count, value) => { return value === '0' ? count + 1 : count }, 0);
  let bitOneCount = bit.reduce((count, value) => { return value === '1' ? count + 1 : count }, 0);

  if(bitZeroCount > bitOneCount) {
    gammaRate.push(0);
    epsilonRate.push(1);
  } else {
    gammaRate.push(1);
    epsilonRate.push(0);
  }
}

gammaRate = gammaRate.join('');
epsilonRate = epsilonRate.join('');

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
