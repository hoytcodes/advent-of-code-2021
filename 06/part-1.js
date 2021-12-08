const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const lanturnfishSchool = inputReader.readNumericalArray(path.join(__dirname, 'input.txt'));

const fishTimer = 6;
const newFishTimer = 8;
const dayLimit = 80;

let schoolModel = lanturnfishSchool;

for(let day = 0; day < dayLimit; day++) {
  let newFish = schoolModel.reduce((count, fish) => fish === 0 ? count + 1 : count, 0);

  schoolModel = schoolModel.map(fish => {
    if(fish === 0) return fishTimer;
    return fish - 1;
  });

  newFishArray = Array(newFish).fill(newFishTimer, 0);
  schoolModel.push(...newFishArray);
}

console.log(schoolModel.length);
