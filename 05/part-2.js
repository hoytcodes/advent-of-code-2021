const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const report = inputReader.read(path.join(__dirname, 'input.txt'));

const processedReport = report.map(entry => {
  let coordinates = entry.split(' -> ');
  return coordinates.map(set => set.split(',').map(value => parseInt(value, 10)));
});

let map = generateMap(processedReport);
map = populateMap(map, processedReport);

function generateMap(report) {
  const xCoordinates = report.map(coordinates => [coordinates[0][0], coordinates[1][0]]).flat();
  const mapWidth = Math.max(...xCoordinates);

  const yCoordinates = report.map(coordinates => [coordinates[0][1], coordinates[1][1]]).flat();
  const mapHeight = Math.max(...yCoordinates);

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

    //Diagonal Check
    if(x1 !== x2 && y1 !== y2) {
      const xDirection = x1 < x2 ? 1 : -1;
      const yDirection = y1 < y2 ? 1 : -1;

      let xPoint = x1;
      let yPoint = y1;

      while(xPoint !== x2 + xDirection || yPoint !== y2 + yDirection) {
        populatedMap[yPoint][xPoint] += 1;

        xPoint += xDirection;
        yPoint += yDirection;
      }
      continue;
    }

    let [xStartPoint, xEndPoint] = [x1, x2].sort((a, b) => { return a - b });
    let [yStartPoint, yEndPoint] = [y1, y2].sort((a, b) => { return a - b });

    for(let y = yStartPoint; y <= yEndPoint; y++) {
      for(let x = xStartPoint; x <= xEndPoint; x++) {
        populatedMap[y][x] += 1;
      }
    }
  }

  return populatedMap;
}

const densityPoints = map.flat().filter(point => point >= 2);

console.log(densityPoints.length);
