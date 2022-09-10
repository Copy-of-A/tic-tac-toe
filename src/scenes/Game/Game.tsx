import React from "react";
import Board from "../../components/Board/Board";
import useGame from "./game.hook";
import { InputLabel, FormControl, Button, Select, MenuItem, Typography } from "@mui/material";

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
        gameSetup,
        rating,
    } = useGame();

    return (
        <div className="page">
            <div className="page setup">
                <FormControl style={{ width: "100%" }} color="secondary">
                    <InputLabel color="secondary" id="demo-simple-select-label">Board size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={borderSize}
                        label="Border size"
                        onChange={handleChangeBorderSize}
                        color="secondary"
                    >
                        <MenuItem color="secondary" value={3}>3 - Three</MenuItem>
                        <MenuItem color="secondary" value={5}>5 - Five</MenuItem>
                        <MenuItem color="secondary" value={10}>10 - Ten</MenuItem>
                    </Select>
                </FormControl>
                <Typography className="setup__group setup__group_margin" variant="h5">Rating:</Typography>
                <Typography className="setup__group">{gameSetup.gamerFirst} : {rating.firstGamerVictories}</Typography>
                <Typography className="setup__group">{gameSetup.gamerSecond} : {rating.secondGamerVictories}</Typography>
                <Typography className="setup__group">Draws: : {rating.draws}</Typography>
            </div>
            <div className="page">
                <h2>{status}</h2>
                <Board
                    squares={squares}
                    winningCombination={winningCombination}
                    onClick={(i) => handleClick(i)}
                    size={+borderSize}
                />
            </div>
            {!gameSetup.isPvE &&
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBackToPreviousStep}
                        disabled={gameHistory.length < 2}
                        style={{marginTop: 20}}
                    >
                        Cansel step
                    </Button>
                }
            <div className="button-container">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={newGameHandleClick}
                >
                    new game
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(-1)}
                >
                    Exit
                </Button>
            </div>
        </div>
    );
}

export default Game;
