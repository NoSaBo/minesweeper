import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Board from "./board";
import Modal from "./modal";
import {
  createBoard,
  revealEmptyCells,
  isWinner,
  initializeBoard
} from "../engine/engine";

function Game() {
  const [config, setConfig] = useState({ row: 8, col: 8, density: 0.1 });
  const numberOfMines = Math.floor(config.row * config.col * config.density);
  const [message, setMessage] = useState("MineSweeper");
  const [isActive, setActive] = useState(true);
  const [isFirstClick, setFirstClick] = useState(true);
  const [arrBoard, setBoard] = useState(
    initializeBoard(config.row, config.col)
  );

  const handleReset = () => {
    setBoard(initializeBoard(config.row, config.col));
    setActive(true);
    setFirstClick(true);
    setMessage("MineSweeper");
  };

  const setGameConfig = str => {
    let row = 6;
    let col = 6;
    let density = 0.1;
    switch (str) {
      case "medium":
        row = 8;
        col = 8;
        density = 0.15;
        break;
      case "hard":
        row = 10;
        col = 10;
        density = 0.2;
        break;
      case "godMode":
        row = 10;
        col = 10;
        density = 0.3;
        break;
      default:
        break;
    }
    setConfig({ row, col, density });
    setBoard(initializeBoard(row, col));
    setActive(true);
    setFirstClick(true);
    setMessage("MineSweeper");
  };

  const handleLeftClick = (x, y) => {
    let updatedBoard = [...arrBoard];

    if (isFirstClick) {
      updatedBoard = createBoard(config.row, config.col, numberOfMines, x, y);
      console.log(updatedBoard);
    }
    if (!isActive) return;
    if (!updatedBoard[y][x].isMarked) {
      if (updatedBoard[y][x].value === -1) {
        let newArrBoard = [...updatedBoard];
        newArrBoard[y][x].isHidden = false;
        setBoard(newArrBoard);
        setMessage("You lose");
        setActive(false);
        setFirstClick(true);
      } else {
        const newArr = revealEmptyCells(updatedBoard, x, y);
        if (isWinner(updatedBoard, numberOfMines)) {
          setMessage("You Win");
          setActive(false);
        }
        setFirstClick(false);
        setBoard(newArr);
      }
    }
  };

  const handleRightClick = (x, y) => {
    if (!isActive) return;
    let newArrBoard = [...arrBoard];
    newArrBoard[y][x].isMarked = !newArrBoard[y][x].isMarked;
    setBoard(newArrBoard);
  };

  return (
    <div>
      {message !== "MineSweeper" ? (
        <Modal
          child={
            <button className="btn btn-primary" onClick={handleReset}>
              Try again
            </button>
          }
        ></Modal>
      ) : null}
      <h1 className="text-center py-2 my-1">{message}</h1>
      <div className="py-2 my-1">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Select Difficulty
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setGameConfig("easy")}>
              Easy
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGameConfig("medium")}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGameConfig("hard")}>
              Hard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGameConfig("godMode")}>
              God Mode
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Board
        isActive={isActive}
        arrBoard={arrBoard}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
}

export default Game;
