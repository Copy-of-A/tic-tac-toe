import React from "react";
import { cn } from "../../helper";

export interface SquareProps {
  value: string;
  winningCombination: boolean;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, winningCombination, onClick }) => {
  return (
    <button className={cn("square", winningCombination && "square-win")} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;