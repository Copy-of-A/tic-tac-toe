import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../App";
import { getFreeSquares, getWinner, WinningCombination } from "./game.algoritms";

const X = "X";
const O = "O";

const useGame = () => {
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
        let _freeSquares = getFreeSquares(squares);
        const randomNum = Math.floor(
            Math.random() * Math.floor(_freeSquares.length)
        );
        handleClick(_freeSquares[randomNum]);
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
    } else if (getFreeSquares(squares).length === 0) {
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

    const navigate = useNavigate();
    
    return {
        squares,
        status,
        winningCombination,
        newGameHandleClick,
        handleBackToPreviousStep,
        navigate,
        handleClick,
    }
}

export default useGame;