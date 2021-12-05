const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const directions = inputReader.read(path.join(__dirname, 'input.txt'));

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

for(let direction of directions) {
  const [directionInput, distance] = direction.split(' ');

  if(directionInput === 'forward') {
    horizontalPosition += parseInt(distance);
    depth += aim * parseInt(distance);
    continue;
  }

  if(directionInput === 'down') {
    aim += parseInt(distance);
    continue;
  }

  if(directionInput === 'up') {
    aim -= parseInt(distance);
    continue;
  }
}

console.log(horizontalPosition * depth);
