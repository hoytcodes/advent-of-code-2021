const fileSync = require('fs');

// Reads an 'input.txt' file and returns an array of strings
 exports.read = function(path) {
  const input = fileSync.readFileSync(path, 'utf-8');
  return input.split('\n');
}

exports.readNumerical = function(path) {
  const input = this.read(path);
  return input.map(entry => parseInt(entry, 10));
}
