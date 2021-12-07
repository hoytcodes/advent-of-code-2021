const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const report = inputReader.read(path.join(__dirname, 'input.txt'));

const processedReport = report.map(entry => {
  let coordinates = entry.split(' -> ');
  return coordinates.map(set => set.split(',').map(value => parseInt(value, 10)));
});

const condensedReport = processedReport.filter(entry => {
  const [x1, y1] = entry[0];
  const [x2, y2] = entry[1];

  return x1 === x2 || y1 === y2;
});

let map = generateMap(condensedReport);
map = populateMap(map, condensedReport);

function generateMap(report) {
  const x2Coordinates = report.map(coordinates => coordinates[1][0]);
  const mapWidth = Math.max(...x2Coordinates);

  const y2Coordinates = report.map(coordinates => coordinates[1][1]);
  const mapHeight = Math.max(...y2Coordinates);

  const map = [];
  for(let i = 0; i <= mapHeight; i++) {
    map[i] = [];
    for(let j = 0; j <= mapWidth; j++) {
      map[i][j] = 0;
    }
  }

  return map;
}

function populateMap(map, report) {
  let populatedMap = map;

  for(let coordinateSet of report) {
    const [x1, y1] = coordinateSet[0];
    const [x2, y2] = coordinateSet[1];

    let startPoint;
    let endPoint;

    if(x1 === x2) {
      startPoint = Math.min(y1, y2);
      endPoint = Math.max(y1, y2);

      for(let i = startPoint; i <= endPoint; i++) {
        populatedMap[i][x1] += 1;
      }
    }

    if(y1 === y2) {
      startPoint = Math.min(x1, x2);
      endPoint = Math.max(x1, x2);

      for(let i = startPoint; i <= endPoint; i++) {
        populatedMap[y1][i] += 1;
      }
    }
  }

  return populatedMap;
}

const densityPoints = map.flat().filter(point => point >= 2);

console.log(densityPoints.length);
