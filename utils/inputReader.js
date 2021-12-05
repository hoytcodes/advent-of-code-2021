const fileSync = require('fs');

 exports.read = function(path) {
  const input = fileSync.readFileSync(path, 'utf-8');
  return input.split('\n');
}

exports.readNumerical = function(path) {
  const input = this.read(path);
  return input.map(entry => parseInt(entry, 10));
}

exports.readBingo = function(path) {
  const input = fileSync.readFileSync(path, 'utf-8');
  let bingoCards = input.split('\n\n');
  const numberDraws = bingoCards.shift().split(',').map(number => parseInt(number, 10));
  return [numberDraws, bingoCards];
}
