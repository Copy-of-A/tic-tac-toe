import React from "react";
import Board from "../Board/Board";
import Button from "@mui/material/Button";
import useGame from "./game.hook";

const Game: React.FC = () => {
    const {
        squares,
        status,
        winningCombination,
        newGameHandleClick,
        handleBackToPreviousStep,
        navigate,
        handleClick,
    } = useGame();

    return (
        <div>
            <span>{status}</span>
            <Board squares={squares} winningCombination={winningCombination} onClick={(i) => handleClick(i)} />
            <Button onClick={newGameHandleClick}>new game</Button>
            <Button onClick={handleBackToPreviousStep} disabled={history.length < 2}>Cansel step</Button>
            <Button onClick={() => navigate(-1)}>Exit</Button>
        </div>
    );
}

export default Game;
