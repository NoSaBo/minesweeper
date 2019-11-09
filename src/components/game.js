import React, { useState } from 'react'
import Board from './board'

function Game() {
  const [message, setMessage] = useState('Juega chats')

  return (
    <div>
      <h1 className="text-center">{message}</h1>
      <Board
        loseGame={() => {
          setMessage('You lose')
        }}
      />
    </div>
  )
}

export default Game
