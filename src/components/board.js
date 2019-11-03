import React, { useState } from 'react'
import Cell from './cell'
import 'bootstrap/dist/css/bootstrap.css'

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

function Board() {
  const size = { x: 4, y: 4 }
  const arrBoard = createBoard(size.x, size.y)

  return (
    <div>
      {arrBoard.map((row, i) => (
        <div className="row">
          {row.map((cell, i) => (
            <div className="col">
              <Cell {...cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
