import React from "react";

export interface SquareProps {
    value: string;
    onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;