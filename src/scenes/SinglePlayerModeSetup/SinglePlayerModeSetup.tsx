import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React from "react";
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
            <span>Play for "X": </span>
            <Switch
                checked={form.isX}
                onChange={handleChangeX}
                value="checked"
                color="primary"
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