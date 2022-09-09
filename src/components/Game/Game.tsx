import React from "react";
import Board from "../Board/Board";
import useGame from "./game.hook";
import { InputLabel, FormControl, Button, Select, MenuItem } from "@mui/material";

const Game: React.FC = () => {
    const {
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
    } = useGame();

    console.log("squares", squares)

    return (
        <div>
            <span>{status}</span>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={borderSize}
                    label="Border size"
                    onChange={handleChangeBorderSize}
                >
                    <MenuItem value={3}>3 - Three</MenuItem>
                    <MenuItem value={5}>5 - Five</MenuItem>
                    <MenuItem value={10}>10 - Ten</MenuItem>
                </Select>
            </FormControl>
            <Board
                squares={squares}
                winningCombination={winningCombination}
                onClick={(i) => handleClick(i)}
                size={+borderSize}
            />
            <Button onClick={newGameHandleClick}>new game</Button>
            <Button onClick={handleBackToPreviousStep} disabled={gameHistory.length < 2}>Cansel step</Button>
            <Button onClick={() => navigate(-1)}>Exit</Button>
        </div>
    );
}

export default Game;
