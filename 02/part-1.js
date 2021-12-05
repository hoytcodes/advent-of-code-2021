const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const directions = inputReader.read(path.join(__dirname, 'input.txt'));

let horizontalPosition = 0;
let depth = 0;

for(let direction of directions) {
  const [directionInput, distance] = direction.split(' ');

  if(directionInput === 'forward') {
    horizontalPosition += parseInt(distance);
    continue;
  }

  if(directionInput === 'down') {
    depth += parseInt(distance);
    continue;
  }

  if(directionInput === 'up') {
    depth -= parseInt(distance);
    continue;
  }
}

console.log(horizontalPosition * depth);
