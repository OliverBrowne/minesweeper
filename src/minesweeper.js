// function that displays the current board..
const printBoard = (board) => {
  console.log('Current Board:');
  console.log( board[0].join(' | ') );
  console.log( board[1].join(' | ') );
  console.log( board[2].join(' | ') );
};

// default board..
let board = [ [' ',' ',' '],
              [' ',' ',' '],
              [' ',' ',' '] ];

// display the current board status
printBoard(board);

// update manually..
board[0][1] = '1';
board[2][2] = 'b';
// and redisplay..
printBoard(board);
