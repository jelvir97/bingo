import Cell from "../models/Cell.js"
// Helper functions for bingo boards.

function makeBoard(choices) {
    let currentIndex = choices.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [choices[currentIndex], choices[randomIndex]] = [
        choices[randomIndex], choices[currentIndex]];
    }
    const cells = choices.map(c => new Cell(c));
    const board = [];

    for(let i = 0; i < 5; i++){
        board.push(cells.slice((i*5),(i*5+5)))
    }
    return board;
}

export {makeBoard};