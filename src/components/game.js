import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Board from "./board";
import Meme from "./meme"
import Modal from "./modal";
import RankingTable from "./ranking-table";
import {
  createBoard,
  revealEmptyCells,
  revealMines,
  isWinner,
  initializeBoard
} from "../engine/engine"
import { gameModes } from "../config/config"

import axios from 'axios'

let timer

function Game() {
  /** State declarations */
  const [config, setConfig] = useState({ ...gameModes["medium"] });
  const [message, setMessage] = useState("MineSweeper");
  const [isActive, setActive] = useState(true);
  const [isFirstClick, setFirstClick] = useState(true);
  const [arrBoard, setBoard] = useState(
    initializeBoard(config.rows, config.cols)
  );
  const [difficulty, setDifficulty] = useState("medium")
  const [time, setTime] = useState(0)
  const [userName, setUserName] = useState('')

  const [rankingData, setRankingTable] = useState(false)
  const [submittingData, setSubmittingData] = useState(false)

  const numberOfMines = Math.floor(config.rows * config.cols * config.density);

  const handleReset = () => {
    setBoard(initializeBoard(config.rows, config.cols))
    setActive(true)
    setFirstClick(true)
    setMessage("MineSweeper")
    setTime(0)
    setRankingTable(false)
  };

  const setGameConfig = str => {
    const gameMode = gameModes[str] || gameModes["medium"]
    setConfig({ ...gameMode });
    setBoard(initializeBoard(gameMode["rows"], gameMode["cols"]));
    setActive(true);
    setFirstClick(true);
    setMessage("MineSweeper");
    setDifficulty(str)
    clearInterval(timer)
    setTime(0)
  }

  const handleLeftClick = (x, y) => {
    let updatedBoard = [...arrBoard];

    if (isFirstClick) {
      timer = setInterval(() => setTime(time => time + 1), 1000)
      updatedBoard = createBoard(config.rows, config.cols, numberOfMines, x, y);
    }
    if (!isActive) return;
    if (!updatedBoard[y][x].isMarked) {
      if (updatedBoard[y][x].value === -1) {
        let newArrBoard = revealMines(updatedBoard)
        setBoard(newArrBoard)
        setMessage("You lose")
        clearInterval(timer)
        setActive(false)
        setFirstClick(true)

      } else {
        const newArr = revealEmptyCells(updatedBoard, x, y);
        if (isWinner(updatedBoard, numberOfMines)) {
          setMessage("You Win")
          setActive(false)
          clearInterval(timer)
        }
        setFirstClick(false);
        setBoard(newArr);
      }
    }
  }

  const showRanks = () => {
    const url = `https://minesweeper-back.herokuapp.com/record/level/${config.level}`
    axios.get(url)
      .then(data => {
        setRankingTable(data.data)

      })
      .catch(err => console.error(`error getting rankings`, err))
  }

  const postNewRank = () => {
    setSubmittingData(true)
    const url = 'https://minesweeper-back.herokuapp.com/record'

    axios.post(url, {
      name: userName,
      difficulty: gameModes[difficulty].level,
      record: time,
      date: new Date().getTime()
    })
      .then(data => {
        showRanks()
        setSubmittingData(false)
      })
      .catch(err => console.error(`error getting rankings`, err))
  }

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
              <h3>{message === "You Win" ? `Congratulations! you beat '${gameModes[difficulty].name}' in ${time} seconds` : `You lose :(`}</h3>
            </div>

            {
              rankingData
                ? <RankingTable data={rankingData}></RankingTable>
                : [
                  message === "You Win"
                    ? <div className={"py-2"}>
                      <h3>Enter your name: </h3>
                      <input className="m-1" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                      <button className="btn btn-primary btn-sm m-1" onClick={postNewRank} {...submittingData ? { disabled: true } : null}>
                        {`${submittingData ? 'Submitting...' : 'Submit'}`}
                      </button>
                    </div>
                    : null,
                  <Meme difficulty {...{ didWin: message === "You Win" ? true : false }} />
                ]
            }

            <div className={"py-2"}>
              <button className="btn btn-primary btn-sm" onClick={handleReset}>
                Try again
          </button>
            </div>
          </div>
        }
      ></Modal>
    ) : null,
    <div className="container" key="board-container">
      <h1 className="text-center py-2 my-1" style={{ fontVariant: "all-small-caps" }}>Mine Sweeper</h1>
      <div className="row py-2 my-1" key="game-setup">
        <div className="col-sm text-center" key="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={"btn-sm"}>
              {gameModes[difficulty].name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setGameConfig("easy")}>
                {`${gameModes["easy"].name} ${gameModes["easy"].rows}x${gameModes["easy"].cols}`}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGameConfig("medium")}>
                {`${gameModes["medium"].name} ${gameModes["medium"].rows}x${gameModes["medium"].cols}`}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGameConfig("hard")}>
                {`${gameModes["hard"].name} ${gameModes["hard"].rows}x${gameModes["hard"].cols}`}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGameConfig("god")}>
                {`${gameModes["god"].name} ${gameModes["god"].rows}x${gameModes["god"].cols}`}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-sm text-center" key="number-of-mines">
          Mines Left: <b> {numberOfMines - arrBoard.reduce((accu, row) => accu + row.filter(cell => cell.isMarked).length, 0)} </b>
        </div>
        <div className="col-sm text-center" key="timer">
          <b> {`${Math.floor(time / 60) < 10 ? '0' : ''}${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`} </b>
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
