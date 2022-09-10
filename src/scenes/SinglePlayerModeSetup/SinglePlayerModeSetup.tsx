import { Button, TextField } from "@mui/material";
import React from "react";
import ChooseXPlayerRadioGroup from "../../components/ChooseXPlayerRadioGroup/ChooseXPlayerRadioGroup";
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
        <div className="page">
            <div className="page setup">
                <TextField
                    label="Name"
                    variant="outlined"
                    helperText={error ? "Shouldn`t be empty" : "Enter your name"}
                    color="secondary"
                    error={error}
                    onChange={handleChangeName}
                    onBlur={() => setError(false)}
                    onFocus={() => setError(false)}
                    fullWidth
                />
                <ChooseXPlayerRadioGroup
                    value={form.xPlayer.toString()}
                    handleChange={handleChangeX}
                    labels={[
                        "Me",
                        "Computer",
                        "Choose at random"
                    ]}
                    className="setup__group setup__group_margin"
                />
            </div>
            <div className="button-container">
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