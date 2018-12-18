// create a blank board..
const generatePlayerBoard = (numberOfRows,numberOfColumns) => {
  const board = [] ;
  for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++) {
    const row = [] ;
    for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++) {
      row.push(' ') ;
    }
    board.push(row) ;
  }
  return board ;
}

// create a bomb-board..
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [] ;
  for (let rowIndex=0; rowIndex<numberOfRows; rowIndex++) {
    const row = [] ;
    for (let columnIndex=0; columnIndex<numberOfColumns; columnIndex++) {
      row.push(null) ;
    }
    board.push(row) ;
  }
  let numberOfBombsPlaced = 0 ;
  while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random()*numberOfRows) ;
    const randomColumnIndex = Math.floor(Math.random()*numberOfColumns) ;
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B' ;
      numberOfBombsPlaced += 1 ;
    }
  }
  return board ;
}

// count the numbers of bombs around a cell
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighbourOffsets = [ [ 1,-1],[ 1, 0],[ 1, 1],
                             [ 0,-1],        [ 0, 1],
                             [-1,-1],[-1, 0],[-1, 1] ] ;
  const numberOfRows    = bombBoard.length ;
  const numberOfColumns = bombBoard[0].length ;
  let numberOfBombs = 0 ;
  neighbourOffsets.forEach( offset => {
    const neighborRoxIndex = rowIndex + offset[0] ;
    const neighborColumnIndex = columnIndex + offset[1] ;
    if (        neighborRoxIndex >= 0        &&
            neighborRoxIndex < numberOfRows  &&
               neighborColumnIndex >= 0      &&
         neighborColumnIndex < numberOfColumns ) {
      if (bombBoard[neighborRoxIndex][neighborColumnIndex] === 'B') {
        numberOfBombs += 1 ;
      }
    }
  } ) ;
  return numberOfBombs ;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if ( playerBoard[rowIndex][columnIndex] !== ' ' ) {
    console.log(`This tile has already been flipped!\n`) ;
    return ;
  } else if (bombBoard[rowIndex][columnIndex] === 'B' ) {
    playerBoard[rowIndex][columnIndex] = 'B' ;
    return ;
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex) ;
    return ;
  }
}

// function that displays the current board..
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// setup and play with output...
let playerBoard = generatePlayerBoard(3,4) ;
let bombBoard = generateBombBoard(3,4,5) ;
console.log('Player board: ') ;
printBoard(playerBoard) ;
console.log('Bomb board: ') ;
printBoard(bombBoard) ;

flipTile(playerBoard,bombBoard,0,0) ;
console.log('Updated Player Board: ') ;
printBoard(playerBoard) ;
