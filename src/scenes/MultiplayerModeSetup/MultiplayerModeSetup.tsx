import React from "react";
import useMultiplayerModeSetup from "./multiplayerModeSetup.hook";
import { Button, TextField } from "@mui/material";
import ChooseXPlayerRadioGroup from "../../components/ChooseXPlayerRadioGroup/ChooseXPlayerRadioGroup";

const Mode: React.FC = () => {
    const {
        error,
        handleChangeName1,
        handleChangeName2,
        onBlur,
        navigate,
        form,
        handleChangeX,
        onStartClick,
    } = useMultiplayerModeSetup();

    return (
        <div className="page">
            <div className="page setup">
                <TextField
                    label="Player 1"
                    variant="outlined"
                    helperText={error.nameFirstError || "Enter first player name"}
                    color="secondary"
                    onChange={handleChangeName1}
                    error={!!error.nameFirstError}
                    onBlur={onBlur}
                    onFocus={onBlur}
                    fullWidth
                    className="setup__text-field setup__text-field_bottom"
                />
                <TextField
                    label="Player 2"
                    variant="outlined"
                    helperText={error.nameSecondError || "Enter second player name"}
                    color="secondary"
                    onChange={handleChangeName2}
                    error={!!error.nameSecondError}
                    onBlur={onBlur}
                    onFocus={onBlur}
                    fullWidth
                    className="setup__text-field"
                />
                <ChooseXPlayerRadioGroup
                    value={form.xPlayer.toString()}
                    handleChange={handleChangeX}
                    labels={[
                        "First player",
                        "Second player",
                        "Choose at random"
                    ]}
                    className="setup__group setup__group_margin"
                />
            </div>
            <div className="button-container">
                <Button
                    onClick={() => navigate(-1)}
                    variant="contained"
                    color="secondary"
                >
                    Back
                </Button>
                <Button
                    onClick={onStartClick}
                    variant="contained"
                    color="secondary"
                >
                    Play
                </Button>
            </div>
        </div>
    );
}

export default Mode;