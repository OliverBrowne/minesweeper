// this is minesweeper, a project part of the codecademy course on front-end dev

// the blank line variable..
const blankLine = '  |   |  ';

// simple demo of the most basic form (3 blank lines)...
console.log(`This is what an empty board would look like:`);
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

// setup a less simplified version with guesses and bombs..
const guessLine = '1 |   |  ';
const bombLine  = '  | B |  ';

// print a version of it..
console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);

// assign bomb to random row..
let row = Math.floor(Math.random() * 3);
console.log(row);
console.log('This is what a board with a randomly located bomb on it would look like:');
for (i=0; i<3; i++) {
  if (i === row) {
    console.log(bombLine)
  } else {
    console.log(blankLine)
  }
}
