import React, { useState } from "react";
import Cell from "./cell";
import "bootstrap/dist/css/bootstrap.css";

/** Create the board */
const initializeBoard = (x, y) => {
  let arr = [];
  const initCell = {
    isHidden: false,
    isMarked: false,
    value: 0
  };
  for (let i = 0; i < x; i++) {
    let row = [];
    for (let j = 0; j < y; j++) {
      row.push({ ...initCell });
    }
    arr.push([...row]);
  }
  return arr;
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/** Create list of mines */
const createMines = (density, x, y) => {
  let numberOfMines = Math.floor(x * y * density);
  const mines = [];
  while (numberOfMines) {
    let coord = { x: getRandomInteger(0, x), y: getRandomInteger(0, y) };
    if (!mines.includes(coord)) {
      mines.push(coord);
      numberOfMines--;
    }
  }
  return mines;
};

/** Fill the board with mines */
const placeMines = (board, mines) => {
  mines.forEach(coord => (board[coord.x][coord.y].value = -1));
  return board;
};

/** Fill the board with values of bomb neighbors */
const setBombNeighbors = (board, mines) => {
  return board;
};

const createBoard = (cols, rows, density) => {
  let board = initializeBoard(cols, rows);
  placeMines(board, createMines(density, cols, rows));
  setBombNeighbors(board);
  return board;
};

function Board() {
  const size = { x: 6, y: 6 }; // Fixed size of board
  let arrBoard = createBoard(size.x, size.y, 0.5); // Fixed density

  return (
    <div>
      {arrBoard.map((row, i) => (
        <div className="row">
          {row.map((cell, i) => (
            <div className="">
              <Cell {...cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
