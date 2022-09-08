import React from "react";
import { WinningCombination } from "./Game";

export interface SquareProps {
    value: string;
    winningCombination: boolean;
    onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, winningCombination, onClick }) => {
  return (
    <div className="square" onClick={onClick} style={winningCombination ? {background: "green"} : {background: "inherit"}}>
      {value}
    </div>
  );
};

export default Square;