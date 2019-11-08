import React, { useState } from 'react'
import Cell from './cell'
import 'bootstrap/dist/css/bootstrap.css'

/** Create the board */
const createBoard = (x, y) => {
  let arr = []
  const initCell = {
    isHidden: false,
    isMarked: false,
    value: 0
  }
  for (let i = 0; i < x; i++) {
    let row = []
    for (let j = 0; j < y; j++) {
      row.push({ ...initCell })
    }
    arr.push([...row])
  }
  return arr
}

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/** Fill the board with mines */
const putMines = (board, density, x, y) => {
  let numberOfMines = Math.floor(x * y * density)
  while (numberOfMines) {
    let _x = getRandomInteger(0, x)
    let _y = getRandomInteger(0, y)
    if (board[_x][_y] !== -1) {
      board[_x][_y] = { ...board[_x][_y], value: -1 }
      numberOfMines--
    }
  }
  return board
}

function Board() {
  const size = { x: 6, y: 6 }
  let arrBoard = createBoard(size.x, size.y)
  arrBoard = putMines(arrBoard, 0.5, size.x, size.y)

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
  )
}

export default Board
