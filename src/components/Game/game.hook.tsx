import { SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../App";
import { getFreeSquares, getWinner, WinningCombination } from "./game.algoritms";

const X = "X";
const O = "O";

const useGame = () => {
    const { gameSetup } = useContext(GameContext);
    const [borderSize, setBorderSize] = useState<string>("3");
    const [squares, setSquares] = useState(Array((+borderSize) ** 2).fill(null));
    const [isX, setIsX] = useState(true);
    const [winningCombination, setWinningCombination] = useState<WinningCombination | null>(null);
    const [gameHistory, setGameHistory] = useState<Array<Array<null | string>>>(
        [Array((+borderSize) ** 2).fill(null)],
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (!gameSetup.isPvP && (isX && !gameSetup.isFirstForX || !isX && gameSetup.isFirstForX)) {
            setTimeout(() => computerHandleClick(), 1000);
        }
    }, [isX]);

    useEffect(() => {
        if (gameSetup.gamerFirst === null) navigate("/");
    }, [gameSetup])

    useEffect(() => {
        setSquares(Array((+borderSize) ** 2).fill(null));
    }, [borderSize]);

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
        setGameHistory(prevState => (
            prevState.concat([_squares])
        ))
        setIsX(!isX);
        setWinningCombination(getWinner(_squares, i));
    };

    const handleBackToPreviousStep = () => {
        if (winningCombination) setWinningCombination(null);
        setIsX(!isX);
        setGameHistory(prevState => (
            prevState.slice(0, -1)
        ))
    };

    useEffect(() => {
        setSquares(gameHistory[gameHistory.length - 1]);
    }, [gameHistory])

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
        setSquares(Array((+borderSize) ** 2).fill(null));
        setIsX(true);
    };

    const handleChangeBorderSize = (event: SelectChangeEvent) => {
        setBorderSize((+event.target.value).toString() as string);
    };

    return {
        squares,
        status,
        winningCombination,
        newGameHandleClick,
        handleBackToPreviousStep,
        navigate,
        handleClick,
        borderSize,
        handleChangeBorderSize,
        gameHistory,
    }
}

export default useGame;