import React, { useState } from 'react'
import Cell from './cell'
import 'bootstrap/dist/css/bootstrap.css'

/** Create the board */
const initializeBoard = (x, y) => {
  let arr = []
  const initCell = {
    isHidden: true,
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

/** Create list of mines */
const createMines = (density, x, y) => {
  let numberOfMines = Math.floor(x * y * density)
  const mines = []
  while (numberOfMines) {
    let coord = { x: getRandomInteger(0, x), y: getRandomInteger(0, y) }
    if (!mines.includes(coord)) {
      mines.push(coord)
      numberOfMines--
    }
  }
  return mines
}

/** Fill the board with mines */
const placeMines = (board, mines) => {
  mines.forEach(coord => (board[coord.x][coord.y].value = -1))
  return board
}

/** Fill the board with values of bomb neighbors */
const setBombNeighbors = (board, x, y) => {
  let steps = [-1, 0, 1]
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (board[i][j].value !== -1) {
        for (let stepX of steps) {
          for (let stepY of steps) {
            if (!(stepX === 0 && stepY === 0)) {
              if (
                board[i + stepX] &&
                board[i + stepX][j + stepY] &&
                board[i + stepX][j + stepY].value === -1
              )
                board[i][j].value++
            }
          }
        }
      }
    }
  }
  return board
}

const createBoard = (cols, rows, density) => {
  let board = initializeBoard(cols, rows)
  placeMines(board, createMines(density, cols, rows))
  setBombNeighbors(board, cols, rows)
  return board
}

function Board(props) {
  const [arrBoard, setBoard] = useState(createBoard(8, 8, 0.2)) // Fixed density, size

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
                    let newArrBoard = [...arrBoard]
                    newArrBoard[y][x].isHidden = false
                    setBoard(newArrBoard)
                    if (arrBoard[y][x].value === -1) props.loseGame()
                  }
                }}
                onRightClick={() => {
                  let newArrBoard = [...arrBoard]
                  newArrBoard[y][x].isMarked = !newArrBoard[y][x].isMarked
                  setBoard(newArrBoard)
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
