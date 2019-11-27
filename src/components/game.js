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
import axios from 'axios'

let timer

function Game() {
  /** State declarations */
  const [config, setConfig] = useState({ row: 8, col: 8, density: 0.1 });
  const [message, setMessage] = useState("MineSweeper");
  const [isActive, setActive] = useState(true);
  const [isFirstClick, setFirstClick] = useState(true);
  const [arrBoard, setBoard] = useState(
    initializeBoard(config.row, config.col)
  );
  const [difficulty, setDifficulty] = useState("medium")
  const [time, setTime] = useState(0)
  const [winGif, setGif] = useState('')

  const numberOfMines = Math.floor(config.row * config.col * config.density);

  const handleReset = () => {
    setBoard(initializeBoard(config.row, config.col))
    setActive(true)
    setFirstClick(true)
    setMessage("MineSweeper")
    setTime(0)
    setGif("")
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
    setDifficulty(str)
    clearInterval(timer)
    setTime(0)
  }

  const getGif = didWin => {
    const tagWin = difficulty === "godMode" ? "epic" : "celebrate"
    const tagLose = "cry"
    const url = didWin
      ? `https://api.giphy.com/v1/gifs/random?api_key=NE2CZKYPQSvRQfbosCF1tTHdDRTmd9Su&tag=${tagWin}`
      : `https://api.giphy.com/v1/gifs/random?api_key=NE2CZKYPQSvRQfbosCF1tTHdDRTmd9Su&tag=${tagLose}`
    axios.get(url)
      .then(data => setGif(data.data.data.image_url))
      .catch(error => console.log(`error getting gif`, error))
  }

  const handleLeftClick = (x, y) => {
    let updatedBoard = [...arrBoard];

    if (isFirstClick) {
      timer = setInterval(() => setTime(time => time + 1), 1000)
      updatedBoard = createBoard(config.row, config.col, numberOfMines, x, y);
      console.log(updatedBoard);
    }
    if (!isActive) return;
    if (!updatedBoard[y][x].isMarked) {
      if (updatedBoard[y][x].value === -1) {
        let newArrBoard = [...updatedBoard];
        newArrBoard[y][x].isHidden = false;
        setBoard(newArrBoard)
        setMessage("You lose")
        clearInterval(timer)
        setActive(false)
        setFirstClick(true)
        getGif(false)
      } else {
        const newArr = revealEmptyCells(updatedBoard, x, y);
        if (isWinner(updatedBoard, numberOfMines)) {
          setMessage("You Win")
          setActive(false)
          clearInterval(timer)
          getGif(true)
        }
        setFirstClick(false);
        setBoard(newArr);
      }
    }
  };

  const handleRightClick = (x, y) => {
    if (!isActive || !arrBoard[y][x].isHidden) return;
    let newArrBoard = [...arrBoard];
    newArrBoard[y][x].isMarked = !newArrBoard[y][x].isMarked;
    setBoard(newArrBoard);
  };

  return [
    message !== "MineSweeper" ? (
      <Modal
        child={
          <div className="text-center">
            <div className={"py-2"}>
              <h2>{message === "You Win" ? `Congratulations! you did it in ${time} seconds` : `:(`}</h2>
            </div>
            <div className={"py-2"}>
              <img src={winGif} style={{ height: "200px" }} />
            </div>
            <div className={"py-2"}>
              <button className="btn btn-primary" onClick={handleReset}>
                Try again
          </button>
            </div>
          </div>
        }
      ></Modal>
    ) : null,
    <div className="container">
      <h1 className="text-center py-2 my-1" style={{ fontVariant: "all-small-caps" }}>Mine Sweeper</h1>
      <div className="row py-2 my-1">
        <div className="col-sm text-center" key="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {difficulty[0].toUpperCase() + difficulty.slice(1)}
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
        <div className="col-sm text-center" key="number-of-mines">
          Mines Left: {numberOfMines - arrBoard.reduce((accu, row) => accu + row.filter(cell => cell.isMarked).length, 0)}
        </div>
        <div className="col-sm text-center" key="timer">
          {`${Math.floor(time / 60) < 10 ? '0' : ''}${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
        </div>

      </div>
      <Board
        isActive={isActive}
        arrBoard={arrBoard}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  ]
}

export default Game;
