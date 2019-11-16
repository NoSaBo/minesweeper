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
const createMines = (numberOfMines, x, y) => {
  const mines = []
  while (numberOfMines) {
    let coord = { x: getRandomInteger(0, x), y: getRandomInteger(0, y) }
    if (!mines.some(mine => mine.x === coord.x && mine.y === coord.y)) {
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
const setBombNeighbors = (board, mines) => {
  let steps = [-1, 0, 1]
  mines.forEach(mine => {
    for (let stepX of steps) {
      for (let stepY of steps) {
        if (!(stepX === 0 && stepY === 0)) {
          if (
            board[mine.x + stepX] &&
            board[mine.x + stepX][mine.y + stepY] &&
            board[mine.x + stepX][mine.y + stepY].value !== -1
          )
            board[mine.x + stepX][mine.y + stepY].value++
        }
      }
    }
  })
  return board
}

export const createBoard = (cols, rows, numberOfMines) => {
  let board = initializeBoard(cols, rows)
  let mines = createMines(numberOfMines, cols, rows)
  placeMines(board, mines)
  setBombNeighbors(board, mines)
  return board
}

export const revealEmptyCells = (board, x, y) => {
  let newBoard = [...board]
  if (newBoard[y][x].value !== 0) {
    newBoard[y][x].isHidden = false
    return newBoard
  } else {
    let steps = [-1, 0, 1]
    newBoard[y][x].isHidden = false
    for (let stepX of steps) {
      for (let stepY of steps) {
        if (!(stepX === 0 && stepY === 0)) {
          let coordExistsAndHidden =
            newBoard[y + stepY] &&
            newBoard[y + stepY][x + stepX] &&
            newBoard[y + stepY][x + stepX].isHidden === true
          if (coordExistsAndHidden && newBoard[y + stepY][x + stepX].value > 0)
            newBoard[y + stepY][x + stepX].isHidden = false
          if (coordExistsAndHidden && newBoard[y + stepY][x + stepX].value === 0)
            newBoard = revealEmptyCells(newBoard, x + stepX, y + stepY)
        }
      }
    }
  }
  return newBoard
}

export const isWinner = (board, numberOfMines) =>
  board.reduce((accu, row) => accu + row.filter(cell => cell.isHidden).length, 0) === numberOfMines
