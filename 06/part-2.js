const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const lanturnfishSchool = inputReader.readNumericalArray(path.join(__dirname, 'input.txt'));

const fishTimer = 6;
const dayLimit = 256;

let schoolModel = Array(9).fill(0);
lanturnfishSchool.forEach(fish => {
  schoolModel[fish]++;
});

for(let day = 0; day < dayLimit; day++) {
  let newFish = schoolModel.shift();
  schoolModel.push(newFish);
  schoolModel[fishTimer] += newFish;
}

const fishCount = schoolModel.reduce((count, fish) => count + fish, 0);
console.log(fishCount);
