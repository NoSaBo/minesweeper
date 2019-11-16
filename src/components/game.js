import React, { useState } from 'react'
import Board from './board'
import Modal from './modal'
import { createBoard, revealEmptyCells, isWinner } from '../engine/engine'

function Game() {
  const numberOfMines = Math.floor(10, 10, 0.1)
  const [message, setMessage] = useState('MineSweeper')
  const [isActive, setActive] = useState(true)
  const [arrBoard, setBoard] = useState(createBoard(10, 10, numberOfMines)) // Fixed density, size

  const handleReset = () => {
    setBoard(createBoard(10, 10, numberOfMines))
    setActive(true)
    setMessage('MineSweeper')
  }

  const handleLeftClick = (x, y) => {
    if (!isActive) return
    if (!arrBoard[y][x].isMarked) {
      if (arrBoard[y][x].value === -1) {
        let newArrBoard = [...arrBoard]
        newArrBoard[y][x].isHidden = false
        setBoard(newArrBoard)
        setMessage('You lose')
        setActive(false)
      } else {
        const newArr = revealEmptyCells(arrBoard, x, y)
        if (isWinner(arrBoard, numberOfMines)) {
          setMessage('You Win')
          setActive(false)
        }
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
