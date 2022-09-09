import React from "react";
import { WinningCombination } from "../../scenes/Game/game.algoritms";
import Square from "../Square/Square";

export interface BoardProps {
    squares: string[];
    winningCombination: WinningCombination | null;
    size: number;
    onClick: (i: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, winningCombination, size, onClick }) => {
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

    return <div className={`grid grid_${size}`}>{getAllSquares()}</div>;
}

export default Board;