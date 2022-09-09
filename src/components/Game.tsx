import React, { useContext, useEffect } from "react";
import Board from "./Board";
import { useState } from "react";
import { GameContext } from "../App";
import Button from "@mui/material/Button";

enum WiningLine {
    Horizontal = "horizontal",
    Vertical = "vertical",
    MainDiagonal = "mainDiagonal",
    SecondaryDiagonal = "secondaruDiagonal",
};

const X = "X";
const O = "O";

export interface WinningCombination {
    winingLine: WiningLine | null,
    lineNumberArray: number[] | null;
}

const Game: React.FC = () => {
    const { gameSetup } = useContext(GameContext);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);
    const [winningCombination, setWinningCombination] = useState<WinningCombination | null>(null);
    const [history, setHistory] = useState<Array<Array<null | string>>>(
        [Array(9).fill(null)],
    );

    useEffect(() => {
        if (!gameSetup.isPvP && (isX && !gameSetup.isFirstForX || !isX && gameSetup.isFirstForX)) {
            setTimeout(() => computerHandleClick(), 1000);
        }
    }, [isX]);

    const computerHandleClick = () => {
        let _freeSquares = getFreeSquares();
        const randomNum = Math.floor(
            Math.random() * Math.floor(_freeSquares.length)
        );
        handleClick(_freeSquares[randomNum]);
    };

    const checkHorizontal = (_squares: number[], currentSquare: number, lineLength: number) => {
        const mainRoot = _squares[currentSquare]; // item that has been clicked;
        const lineNumber = Math.floor(currentSquare / lineLength);
        const winnerArray = [];
        for (let i = 0; i < lineLength; i++) {
            if (_squares[lineNumber * lineLength + i] !== mainRoot) {
                return null;
            }
            winnerArray.push(lineNumber * lineLength + i);
        }
        return winnerArray;
    }

    const checkVertical = (_squares: number[], currentSquare: number, lineLength: number) => {
        const mainRoot = _squares[currentSquare] // item that has been clicked;
        const columnNumber = currentSquare % lineLength;
        const winnerArray = [];
        for (let i = 0; i < lineLength; i++) {
            if (_squares[i * lineLength + columnNumber] !== mainRoot) {
                return null;
            }
            winnerArray.push(i * lineLength + columnNumber);
        }
        return winnerArray;
    }

    const checkMainDiagonal = (_squares: number[], currentSquare: number, lineLength: number) => {
        const mainRoot = _squares[currentSquare] // item that has been clicked;
        const winnerArray = [];
        for (let i = 0; i < lineLength; i++) {
            if (_squares[i + lineLength * i] !== mainRoot) {
                return null;
            }
            winnerArray.push(i + lineLength * i);
        }
        return winnerArray;
    }

    const checkSecondaryDiagonal = (_squares: number[], currentSquare: number, lineLength: number) => {
        const mainRoot = _squares[currentSquare] // item that has been clicked;
        const winnerArray = [];
        for (let i = 0; i < lineLength; i++) {
            if (_squares[(i + 1) * lineLength - (i + 1)] !== mainRoot) {
                return null;
            }
            winnerArray.push((i + 1) * lineLength - (i + 1));
        }
        return winnerArray;
    }

    type GetWinnerHelper = (winingLine: WiningLine | null, lineNumberArray: number[] | null) => WinningCombination;

    const getWinnerHelper: GetWinnerHelper = (winingLine, lineNumberArray): WinningCombination => {
        return ({
            winingLine,
            lineNumberArray,
        })
    }

    const getWinner = (_squares: number[], i: number) => {
        const lineLength = Math.sqrt(_squares.length);

        let combination = checkHorizontal(_squares, i, lineLength);
        if (combination) return getWinnerHelper(WiningLine.Horizontal, combination);

        combination = checkVertical(_squares, i, lineLength);
        if (combination) return getWinnerHelper(WiningLine.Vertical, combination);

        combination = checkMainDiagonal(_squares, i, lineLength);
        if (combination) return getWinnerHelper(WiningLine.MainDiagonal, combination);

        combination = checkSecondaryDiagonal(_squares, i, lineLength);
        if (combination) return getWinnerHelper(WiningLine.SecondaryDiagonal, combination);

        return null;
    };

    const handleClick = (i: number) => {
        if (squares[i] || winningCombination) return;
        const _squares = [...squares];
        _squares[i] = isX ? X : O;
        setSquares(_squares);
        setHistory(prevState => (
            prevState.concat([_squares])
        ))
        setIsX(!isX);
        setWinningCombination(getWinner(_squares, i));
    };

    const handleBackToPreviousStep = () => {
        setHistory(prevState => (
            prevState.slice(0, -1)
        ))
    };

    useEffect(() => {
        setSquares(history[history.length - 1]);
    }, [history])

    const getFreeSquares = () => {
        let _freeSquares: number[] = [];
        squares.forEach((el, i) => {
            if (el === null) {
                _freeSquares.push(i);
            }
        });
        return _freeSquares;
    };

    const getWinnerName = (wonSquare: string) => {
        if (wonSquare === X) {
            return gameSetup.isFirstForX ? gameSetup.gamerFirst : gameSetup.gamerSecond
        }
        else return gameSetup.isFirstForX ? gameSetup.gamerSecond : gameSetup.gamerFirst
    }

    const winner = winningCombination?.lineNumberArray;
    let status;
    if (winner) {
        status = "Winner: " + getWinnerName(squares[winner[0]]) + " played for: " + squares[winner[0]];
    } else if (getFreeSquares().length === 0) {
        status = "Game over: dead heat!";
    } else {
        if (isX) {
            status = "Next player: " + (gameSetup.isFirstForX ? gameSetup.gamerFirst : gameSetup.gamerSecond)
        }
        else {
            status = "Next player: " + (gameSetup.isFirstForX ? gameSetup.gamerSecond : gameSetup.gamerFirst)
        }
    }

    const newGameHandleClick = () => {
        setWinningCombination(null);
        setSquares(Array(9).fill(null));
        setIsX(true);
    };


    return (
        <div>
            <span>{status}</span>
            <Board squares={squares} winningCombination={winningCombination} onClick={(i) => handleClick(i)} />
            <Button onClick={newGameHandleClick}>new game</Button>
            <Button onClick={handleBackToPreviousStep} disabled={history.length < 2}>Cansel step</Button>
        </div>
    );
}

export default Game;
