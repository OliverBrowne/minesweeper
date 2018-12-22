// make sure using modern javascript (es6)..
"use strict" ;

// a class for each game...
class Game {
  // constructor..
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs) ;
  }
  // allow players to flip a tile, and give feedbamethod..
  playMove (rowIndex,columnIndex) {
    this._board.flipTile(rowIndex,columnIndex) ;
    // check what happened...
    if ( this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      // there was a bomb at the flipped location, tell the player they lost..
      console.log('Game over! Tis a bomb! Here is your guesses plus the bombs:') ;
      this._board.printFullBoard() ;
    } else if ( this._board.hasSafeTiles() ) {
      // not a bomb, but more moves left, so - keep going..
      console.log('Current board:')
      this._board.print() ;
      console.log(`Bombs to avoid:  ${this._board.numberOfBombs}`) ;
      console.log(`Safe tiles left: ${this._board.countSafeTiles()}` ) ;
    } else {
      // there was not a bomb, and no safe moves left - game is complete!
      console.log('You won the game! Here was your winning board:') ;
      this._board.print() ;
      console.log( this._board.countSafeTiles() )
    }
  }
}

// generic board class...
class Board {

  // properties..
  constructor (numberOfRows,numberOfColumns,numberOfBombs) {
    this._numberOfBombs = numberOfBombs ;
    this._numberOfTiles = numberOfRows * numberOfColumns ;
    this._playerBoard   = Board.generatePlayerBoard(numberOfRows,numberOfColumns) ;
    this._bombBoard     = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs) ;
  }

  // getter to return playerBoard..
  get playerBoard () {
    return this._playerBoard ;
  }

  get numberOfBombs() {
    return this._numberOfBombs ;
  }

  // method for user to flip a tile..
  flipTile (rowIndex, columnIndex) {
    if ( this._playerBoard[rowIndex][columnIndex] !== ' ' ) {
      console.log(`This tile has already been flipped!\n`) ;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B' ) {
      this._playerBoard[rowIndex][columnIndex] = 'B' ;
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex) ;
      this._numberOfTiles -= 1 ;
    }
  }

  // count the numbers of bombs around a cell..
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighbourOffsets = [ [ 1,-1],[ 1, 0],[ 1, 1],
                               [ 0,-1],        [ 0, 1],
                               [-1,-1],[-1, 0],[-1, 1] ] ;
    const numberOfRows    = this._bombBoard.length ;
    const numberOfColumns = this._bombBoard[0].length ;
    let numberOfBombs = 0 ;
    neighbourOffsets.forEach( offset => {
      const neighborRoxIndex    = rowIndex    + offset[0] ;
      const neighborColumnIndex = columnIndex + offset[1] ;
      if (        neighborRoxIndex >= 0        &&
              neighborRoxIndex < numberOfRows  &&
                 neighborColumnIndex >= 0      &&
           neighborColumnIndex < numberOfColumns ) {
        if (this._bombBoard[neighborRoxIndex][neighborColumnIndex] === 'B') {
          numberOfBombs += 1 ;
        }
      }
    } ) ;
    return numberOfBombs ;
  }

  // returns a count of remaining moves..
  countSafeTiles() {
    return this._numberOfTiles - this._numberOfBombs ;
  }

  // returns true if there are safe tiles still available to find..
  hasSafeTiles () {
    return (this._numberOfTiles !== this._numberOfBombs) ;
  }

  // function that displays the current board..
  print () {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // return the full board (in case player loses)..
  printFullBoard() {
    // I need to somehow make a new output where I show all the player's current
    // guesses plus all the Bombs.
    let printBoard = this.playerBoard ;
    for (let i=0; i<this.playerBoard.length; i++) {
      for (let j=0; j<this.playerBoard[i].length; j++) {
        if (this._bombBoard[i][j] === 'B') {
          printBoard[i][j] = 'B' ;
        }
      }
    }
    console.log(printBoard.map(row => row.join(' | ')).join('\n')) ;
  }

  // create a blank board..
  static generatePlayerBoard (numberOfRows,numberOfColumns) {
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
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
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
}

// --- --- --- --- ---

// // instantiate a class...
// const g = new Game(3,3,3) ;

// play a move...
// g.playMove(2,2) ;
// g.playMove(3,2) ;
//g.playMove(1,1) ;
