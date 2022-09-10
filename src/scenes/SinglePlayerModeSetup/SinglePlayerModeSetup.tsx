import { Button, TextField } from "@mui/material";
import React from "react";
import ChoosePlayerRadioGroup from "../../components/ChoosePlayerRadioGroup/ChoosePlayerRadioGroup";
import useSinglePlayerModeSetup from "./singlePlayerModeSetup.hook";

const Mode: React.FC = () => {
    const {
        error,
        setError,
        handleChangeName,
        navigate,
        form,
        handleChangeX,
        onStartClick,
    } = useSinglePlayerModeSetup();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                label="Your name"
                variant="outlined"
                helperText={error ? "Shouldn`t be empty" : "Enter name"}
                color="primary"
                error={error}
                onChange={handleChangeName}
                onBlur={() => setError(false)}
                onFocus={() => setError(false)}
            />
            <ChoosePlayerRadioGroup
                value={form.xPlayer.toString()}
                handleChange={handleChangeX}
                labels={[
                    "You",
                    "Computer",
                    "Choose at random"
                ]}
            />
            <div className="flex-jstf">
                <Button
                    onClick={() => navigate(-1)}
                    variant="contained"
                    color="secondary">Back</Button>
                <Button
                    onClick={onStartClick}
                    variant="contained"
                    color="secondary">Play</Button>
            </div>
        </div>
    );
}

export default Mode;