import React from "react";
import Board from "./Board";
import { useState } from "react";


enum WiningLine {
    Horizontal = "horizontal",
    Vertical = "vertical",
    Diagonal = "diagonal",
  };

const Game: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const handleClick = (i: number) => {
    if (squares[i]) return;
    const _squares = [...squares];
    _squares[i] = isX ? "X" : "O";
    setSquares(_squares);
    setIsX(!isX);
  };


  return (
    <div>
      <Board squares={squares} onClick={(i) => handleClick(i)} />
    </div>
  );
}

export default Game;
