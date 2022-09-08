import React from "react";
import { WinningCombination } from "./Game";
import Square from "./Square";

export interface BoardProps {
    squares: string[];
    winningCombination: WinningCombination | null;
    onClick: (i: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, winningCombination, onClick }) => {
    function getSquare(i: number) {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                winningCombination={!!winningCombination?.lineNumberArray && winningCombination?.lineNumberArray?.findIndex(el => el === i) !== -1}
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