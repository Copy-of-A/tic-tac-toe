import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../App";

const Mode: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<{ name: string; isX: boolean }>({
        name: "",
        isX: true,
    });
    const { setGameSetup } = useContext(GameContext);
    const [error, setError] = useState<boolean>(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            name: event.target.value,
        }));
    };

    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            isX: event.target.checked,
        }));
    };

    const onStartClick = () => {
        console.log("form.name", form.name)
        if (!form.name) {
            setError(true);
            return;
        }
        setGameSetup({
            gamerFirst: form.name,
            gamerSecond: "computer",
            isX: true,
            isPvP: true,
        });
        navigate('/game', { replace: true })
    }

    const label = { inputProps: { 'aria-label': "Play by crosses" } };

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