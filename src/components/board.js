import React, { useState } from "react";
import Cell from "./cell";
import "bootstrap/dist/css/bootstrap.css";

/** Create the board */
const initializeBoard = (x, y) => {
  let arr = [];
  const initCell = {
    isHidden: true,
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
    if (!mines.some(mine => mine.x === coord.x && mine.y === coord.y)) {
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
  let steps = [-1, 0, 1];
  mines.forEach(mine => {
    for (let stepX of steps) {
      for (let stepY of steps) {
        if (!(stepX === 0 && stepY === 0)) {
          if (
            board[mine.x + stepX] &&
            board[mine.x + stepX][mine.y + stepY] &&
            board[mine.x + stepX][mine.y + stepY].value !== -1
          )
            board[mine.x + stepX][mine.y + stepY].value++;
        }
      }
    }
  });
  return board;
};

const createBoard = (cols, rows, density) => {
  let board = initializeBoard(cols, rows);
  let mines = createMines(density, cols, rows);
  placeMines(board, mines);
  setBombNeighbors(board, mines);
  return board;
};

const revealEmptyCells = (board, x, y) => {
  let steps = [-1, 0, 1];
  board[x][y].isHidden = false;
  for (let stepX of steps) {
    for (let stepY of steps) {
      if (!(stepX === 0 && stepY === 0)) {
        let coordExistsAndHidden =
          board[x + stepX] &&
          board[x + stepX][y + stepY] &&
          board[x + stepX][y + stepY].isHidden === true;
        if (coordExistsAndHidden && board[x + stepX][y + stepY].value > 0)
          board[x + stepX][y + stepY].isHidden = false;
        if (coordExistsAndHidden && board[x + stepX][y + stepY].value === 0)
          revealEmptyCells(board, x, y);
      }
    }
  }
  return board;
};

function Board(props) {
  const [arrBoard, setBoard] = useState(createBoard(10, 10, 0.1)); // Fixed density, size

  return (
    <div>
      {arrBoard.map((row, y) => (
        <div className="row" key={`row-${y}`}>
          {row.map((cell, x) => (
            <div className="" key={`cell-${x}`}>
              <Cell
                {...cell}
                onLeftClick={() => {
                  if (!arrBoard[y][x].isMarked) {
                    console.log("value: ", arrBoard[y][x].value);
                    if (arrBoard[y][x].value === -1) props.loseGame();
                    if (arrBoard[y][x].value === 0) {
                      const newArr = revealEmptyCells(arrBoard, x, y);
                      setBoard(newArr);
                    }
                  }
                }}
                onRightClick={() => {
                  let newArrBoard = [...arrBoard];
                  newArrBoard[y][x].isMarked = !newArrBoard[y][x].isMarked;
                  setBoard(newArrBoard);
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
