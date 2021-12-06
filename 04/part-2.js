const inputReader = require('../utils/inputReader.js');
const path  = require('path');
const [numberDraws, bingoCards] = inputReader.readBingo(path.join(__dirname, 'input.txt'));

// Process cards into arrays of number objects
let boards = bingoCards.map(card => {
  const lines = card.split('\n');

  return lines.map(line => {
    let numbers = line.trim().split(/\s+/);
    return numbers.map((number, index) => {
      return {
        number: parseInt(number, 10),
        column: index,
        marked: false,
      }
    });
  });
});

let winningNumbers = [];
let lastWinningBoard;

// For each number in the number draws mark the number on the board until all winners are found
for(let number of numberDraws) {
  for(let board of boards) {
    const rowIndex = board.findIndex(row => row.some(
      numberObject => numberObject.number === number
    ));

    if(rowIndex < 0) continue;

    const columnIndex = board[rowIndex].map(numberObject => numberObject.number).indexOf(number);
    board[rowIndex][columnIndex].marked = true;

    // Check if there is a winning board
    if(isWinningBoard(board)) {
      if(!winningNumbers.includes(number)) winningNumbers.push(number);
      lastWinningBoard = board;
      boards = boards.filter(board => board !== lastWinningBoard);
    }
  }

  if(boards.length === 0) break;
}

function isWinningBoard(board) {
  for(let row of board) {
    if(row.every(number => number.marked)) return true;
  }

  let noOfColumns = board[0].length;
  const flatBoard = board.flat();

  for(let i = 0; i < noOfColumns; i++) {
    let column = flatBoard.filter(number => number.column === i);

    if(column.every(number => number.marked)) return true;
  }

  return false;
}

// Add all unmarked numbers on final winning board
const unmarkedNumbers = lastWinningBoard.flat().filter(number => !number.marked);
const unmarkedSum = unmarkedNumbers.reduce((sum, number) => { return sum + number.number }, 0);

console.log(unmarkedSum * winningNumbers.pop());
