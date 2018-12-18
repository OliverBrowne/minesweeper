// function that displays the current board..
const printBoard = (board) => {
  board.map( row => {
    row.join(' | ');
  } ).join('\n') ;
  console.log('\n current board:') ;
  console.log( ' '+board[0].join(' | ') ) ;
  console.log( ' '+board[1].join(' | ') ) ;
  console.log( ' '+board[2].join(' | ')+'\n' ) ;
} ;

// create a blank board..
const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
  let board = [] ;
  for (let i=0;i<numberOfRows;i++) {
    let row = [] ;
    for (let j=0;j<numberOfColumns;j++) {
      row.push(' ') ;
    }
    board.push(row) ;
  }
  return board ;
}

// create a bomb-board..
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [] ;
  for (let i=0;i<numberOfRows;i++) {
    let row = [] ;
    for (let j=0;j<numberOfColumns;j++) {
      row.push(null) ;
    }
    board.push(row) ;
  }
  numberOfBombsPlaced = 0 ;
  while (numberOfBombsPlaced < numberOfBombs) {
    randomRowIndex = Math.floor(Math.random()*numberOfRows) ;
    randomColumnIndex = Math.floor(Math.random()*numberOfColumns) ;
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B' ;
      numberOfBombsPlaced += 1 ;
    }
  }
  return board ;
}

let playerBoard = generatePlayerBoard(3,4) ;
let bombBoard = generateBombBoard(3,4,5) ;
console.log('Player board: ') ;
printBoard(playerBoard) ;
console.log('Bomb board: ') ;
printBoard(bombBoard) ;
