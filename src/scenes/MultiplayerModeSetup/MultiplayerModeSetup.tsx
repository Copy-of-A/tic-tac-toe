import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from "@mui/material/Switch";
import useMultiplayerModeSetup from "./multiplayerModeSetup,hook";

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
            <span>First gamer play for "X": </span>
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