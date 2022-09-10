import React from "react";
import useMultiplayerModeSetup from "./multiplayerModeSetup,hook";
import { Button, TextField } from "@mui/material";
import ChoosePlayerRadioGroup from "../../components/ChoosePlayerRadioGroup/ChoosePlayerRadioGroup";

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
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                label="Gamer 1"
                variant="outlined"
                helperText={error.nameFirstError || "Enter name"}
                color="secondary"
                onChange={handleChangeName1}
                error={!!error.nameFirstError}
                onBlur={onBlur}
                onFocus={onBlur}
            />
            <TextField
                label="Gamer 2"
                variant="outlined"
                helperText={error.nameSecondError || "Enter name"}
                color="secondary"
                onChange={handleChangeName2}
                error={!!error.nameSecondError}
                onBlur={onBlur}
                onFocus={onBlur}
            />
            <ChoosePlayerRadioGroup
                value={form.xPlayer.toString()}
                handleChange={handleChangeX}
                labels={[
                    "First player",
                    "Second player",
                    "Choose at random"
                ]}
            />
            <div className="flex-jstf">
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