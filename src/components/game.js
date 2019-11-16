import React, { useState } from 'react'
import Board from './board'
import Modal from './modal'
import { createBoard, revealEmptyCells, isWinner, initializeBoard } from '../engine/engine'

function Game() {
  const numberOfMines = Math.floor(10, 10, 0.1)
  const [message, setMessage] = useState('MineSweeper')
  const [isActive, setActive] = useState(true)
  const [isFirstClick, setFirstClick] = useState(true)
  const [arrBoard, setBoard] = useState(initializeBoard(10, 10)) // Fixed density, size

  const handleReset = () => {
    setBoard(initializeBoard(10, 10))
    setActive(true)
    setFirstClick(true)
    setMessage('MineSweeper')
  }

  const handleLeftClick = (x, y) => {
    let updatedBoard = [...arrBoard]

    if (isFirstClick) {
      updatedBoard = createBoard(10, 10, numberOfMines, x, y)
      console.log(updatedBoard)
    }
    if (!isActive) return
    if (!updatedBoard[y][x].isMarked) {
      if (updatedBoard[y][x].value === -1) {
        let newArrBoard = [...updatedBoard]
        newArrBoard[y][x].isHidden = false
        setBoard(newArrBoard)
        setMessage('You lose')
        setActive(false)
        setFirstClick(true)
      } else {
        const newArr = revealEmptyCells(updatedBoard, x, y)
        if (isWinner(updatedBoard, numberOfMines)) {
          setMessage('You Win')
          setActive(false)
        }
        setFirstClick(false)
        setBoard(newArr)
      }
    }
  }
  const handleRightClick = (x, y) => {
    if (!isActive) return
    let newArrBoard = [...arrBoard]
    newArrBoard[y][x].isMarked = !newArrBoard[y][x].isMarked
    setBoard(newArrBoard)
  }
  return (
    <div>
      {message !== 'MineSweeper' ? (
        <Modal
          child={
            <button className="btn btn-primary" onClick={handleReset}>
              Try again
            </button>
          }
        ></Modal>
      ) : null}
      <h1 className="text-center">{message}</h1>
      <Board
        isActive={isActive}
        arrBoard={arrBoard}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  )
}

export default Game
