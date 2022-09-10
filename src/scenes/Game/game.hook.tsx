import { SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../App";
import { delay } from "../../helper";
import { getFreeSquares, getWinner, WinningCombination } from "./game.algoritms";

const X = "X";
const O = "O";

interface Rating {
    firstGamerVictories: number;
    secondGamerVictories: number;
    draws: number;
}

const useGame = () => {
    const { gameSetup } = useContext(GameContext);
    const [borderSize, setBorderSize] = useState<string>("3");
    const [squares, setSquares] = useState(Array((+borderSize) ** 2).fill(null));
    const [isX, setIsX] = useState(true);
    const [winningCombination, setWinningCombination] = useState<WinningCombination | null>(null);
    const [gameHistory, setGameHistory] = useState<Array<Array<null | string>>>(
        [Array((+borderSize) ** 2).fill(null)],
    );
    const [rating, setRating] = useState<Rating>({
        firstGamerVictories: 0,
        secondGamerVictories: 0,
        draws: 0,
    });
    const [isDeadHeat, setDeadHeat] = useState<boolean>(false);
    const [lastWinner, setLastWinner] = useState<number | null>(null);
    const [isComputerMoving, setComputerMoving] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (gameSetup.isPvE && (isX && !gameSetup.isFirstForX || !isX && gameSetup.isFirstForX)) {
            setComputerMoving(true);
            delay(1000).then(() => {
                computerHandleClick();
                setComputerMoving(false)
            });
        }
    }, [isX]);

    useEffect(() => {
        if (gameSetup.gamerFirst === null) navigate("/");
    }, [gameSetup]);

    useEffect(() => {
        setSquares(Array((+borderSize) ** 2).fill(null));
    }, [borderSize]);

    useEffect(() => {
        setSquares(gameHistory[gameHistory.length - 1]);
    }, [gameHistory]);

    useEffect(() => {
        if (winningCombination !== null) {
            const winner = winningCombination?.lineNumberArray;
            if (getWinnerName(squares[winner![0]] === X) === gameSetup.gamerFirst) {
                setRating((rating) => ({
                    ...rating,
                    firstGamerVictories: rating.firstGamerVictories + 1,
                }));
                setLastWinner(1);
            }
            else {
                setRating((rating) => ({
                    ...rating,
                    secondGamerVictories: rating.secondGamerVictories + 1,
                }))
                setLastWinner(2);
            }

        }
    }, [winningCombination]);

    useEffect(() => {
        if (isDeadHeat) {
            setRating((rating) => ({
                ...rating,
                draws: rating.draws + 1,
            }))
            setLastWinner(0);
        }
    }, [isDeadHeat])

    const computerHandleClick = () => {
        let _freeSquares = getFreeSquares(squares);
        const randomNum = Math.floor(
            Math.random() * Math.floor(_freeSquares.length)
        );
        handleClick(_freeSquares[randomNum], true);
    };

    const handleClick = (i: number, isSynth?: boolean) => {
        if (squares[i] || winningCombination || !isSynth && isComputerMoving) return;
        const _squares = [...squares];
        _squares[i] = isX ? X : O;
        setSquares(_squares);
        setGameHistory(prevState => (
            prevState.concat([_squares])
        ))
        setIsX(!isX);
        setWinningCombination(getWinner(_squares, i));
        if (getFreeSquares(_squares).length === 0) {
            setDeadHeat(true)
        }
    };

    const handleBackToPreviousStep = () => {
        if (winningCombination) setWinningCombination(null);
        setIsX(!isX);
        setGameHistory(prevState => (
            prevState.slice(0, -1)
        ));
        switch (lastWinner) {
            case 0:
                setRating((rating) => ({
                    ...rating,
                    draws: rating.draws - 1,
                }));
                break;
            case 1:
                setRating((rating) => ({
                    ...rating,
                    firstGamerVictories: rating.firstGamerVictories - 1,
                }));
                break;
            case 2:
                setRating((rating) => ({
                    ...rating,
                    secondGamerVictories: rating.secondGamerVictories - 1,
                }));
                break;
        }
        setLastWinner(null);
    };

    const getWinnerName = (xCondition: boolean) => {
        if (xCondition) {
            return gameSetup.isFirstForX ? gameSetup.gamerFirst : gameSetup.gamerSecond
        }
        else return gameSetup.isFirstForX ? gameSetup.gamerSecond : gameSetup.gamerFirst
    }

    const winner = winningCombination?.lineNumberArray;
    let status;
    if (winner) {
        status = "Winner: " + getWinnerName(squares[winner[0]] === X) + " played for: " + squares[winner[0]];
    } else if (isDeadHeat) {
        status = "Game over: dead heat!";
    } else {
        status = "Next player: " + getWinnerName(isX);
    }

    const newGameHandleClick = () => {
        setWinningCombination(null);
        setSquares(Array((+borderSize) ** 2).fill(null));
        setDeadHeat(false);
        setIsX(true);
        setGameHistory([Array((+borderSize) ** 2).fill(null)]);
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
        gameSetup,
        rating,
    }
}

export default useGame;