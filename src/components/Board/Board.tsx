import React from "react";
import { WinningCombination } from "../../scenes/Game/game.algoritms";
import Square from "../Square/Square";
import styles from './board.module.scss'

export interface BoardProps {
    squares: string[];
    winningCombination: WinningCombination | null;
    size: number;
    onClick: (i: number) => void;
};

const Board: React.FC<BoardProps> = ({ squares, winningCombination, size, onClick }) => {
    return (
        <div className={`grid grid_${size}`}>
            {squares.map((_, i) => (
                <Square
                    key={i}
                    value={squares[i]}
                    onClick={() => onClick(i)}
                    winningCombination={!!winningCombination?.lineNumberArray &&
                        winningCombination?.lineNumberArray?.findIndex(el => el === i) !== -1}
                />
            ))}
        </div>
    );
}

export default Board;