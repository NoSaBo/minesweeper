import React from "react";
import Cell from "./cell";
import "bootstrap/dist/css/bootstrap.css";

function Board(props) {
  return (
    <div className="container">
      {props.arrBoard.map((row, y) => (
        <div className="row justify-content-center flex-nowrap" key={`row-${y}`}>
          {row.map((cell, x) => (
            <div className="" key={`cell-${x}`}>
              <Cell
                {...cell}
                onLeftClick={() => {
                  props.onLeftClick(x, y);
                }}
                onRightClick={() => {
                  props.onRightClick(x, y);
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
