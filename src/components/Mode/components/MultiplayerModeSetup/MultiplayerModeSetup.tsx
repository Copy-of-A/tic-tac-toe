import React, { useContext } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../../App";
import Switch from "@mui/material/Switch";

const Mode: React.FC = () => {
    const { setGameSetup } = useContext(GameContext);
    const [form, setForm] = useState<{ nameFirst: string; nameSecond: string, isX: boolean }>({
        nameFirst: "",
        nameSecond: "",
        isX: true,
    });
    const [error, setErrors] = useState<{ nameFirstError: string | null; nameSecondError: string | null }>({
        nameFirstError: null,
        nameSecondError: null,
    });

    const navigate = useNavigate();

    const onStartClick = () => {
        if (!validate()) return;
        setGameSetup({
            gamerFirst: form.nameFirst,
            gamerSecond: form.nameSecond,
            isFirstForX: form.isX,
            isPvP: true,
        });
        navigate('/game', { replace: true });
    }

    const handleChangeName1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            nameFirst: event.target.value,
        }));
    }

    const handleChangeName2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            nameSecond: event.target.value,
        }));
    }

    const validate = () => {
        if (!form.nameFirst) {
            setErrors((errors) => ({
                ...errors,
                nameFirstError: "Shouldn`t be empty"
            }))
            return false;
        }
        if (!form.nameSecond) {
            setErrors((errors) => ({
                ...errors,
                nameSecondError: "Shouldn`t be empty"
            }))
            return false;
        }
        else if (form.nameFirst === form.nameSecond) {
            setErrors((errors) => ({
                nameFirstError: "Shouldn`t be equal",
                nameSecondError: "Shouldn`t be equal",
            }))
            return false;
        }
        return true;
    }

    const onBlur = () => {
        setErrors((errors) => ({
            nameFirstError: null,
            nameSecondError: null
        }))
    }

    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            isX: event.target.checked,
        }));
    };

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