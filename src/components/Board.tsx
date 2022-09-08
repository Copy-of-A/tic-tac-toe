import React from "react";
import Square from "./Square";

export interface BoardProps {
    squares: string[];
    onClick: (i: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  function getSquare(i: number) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  function getAllSquares() {
    let arr = [];
    for (let i = 0; i < squares.length; i++) {
      arr.push(getSquare(i));
    }
    return arr;
  }

  const allSquares = getAllSquares();
  return <div className="grid">{allSquares}</div>;
}

export default Board;