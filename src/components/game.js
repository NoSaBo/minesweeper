import React, { useState } from "react";
import Board from "./board";

function Game() {
  const [message, setMessage] = useState("Juega chats");
  const [isActive, setActive] = useState(true);

  return (
    <div>
      <h1 className="text-center">{message}</h1>
      {message === "You lose" ? (
        <div class="btn btn-primary">Reset Game</div>
      ) : null}
      <Board
        isActive={isActive}
        loseGame={() => {
          setMessage("You lose");
          setActive(false);
        }}
      />
    </div>
  );
}

export default Game;
