import { Button, TextField } from "@mui/material";
import React from "react";
import ChooseXPlayerRadioGroup from "../../components/ChooseXPlayerRadioGroup/ChooseXPlayerRadioGroup";
import useSinglePlayerModeSetup from "./singlePlayerModeSetup.hook";
import styles from "../scenes.module.scss";
import { cn } from "../../helper";
import { NAME_CHARACTER_LIMIT } from "../../const";

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
        <div className={styles.page}>
            <div className={cn(styles.page, styles.setup)}>
                <TextField
                    label="Name"
                    variant="outlined"
                    helperText={error ? "Shouldn`t be empty" : `Enter your name (${form.name.length}/${NAME_CHARACTER_LIMIT})`}
                    color="secondary"
                    error={error}
                    onChange={handleChangeName}
                    onBlur={() => setError(false)}
                    onFocus={() => setError(false)}
                    fullWidth
                    inputProps={{
                        maxLength: NAME_CHARACTER_LIMIT,
                    }}
                />
                <ChooseXPlayerRadioGroup
                    value={form.xPlayer.toString()}
                    handleChange={handleChangeX}
                    labels={[
                        "Me",
                        "Computer",
                        "Choose at random"
                    ]}
                    className={cn(styles.setupGroup, styles.setupGroupMargin)}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    onClick={() => navigate(-1)}
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                >
                    Back
                </Button>
                <Button
                    onClick={onStartClick}
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                >
                    Play
                </Button>
            </div>
        </div>
    );
}

export default Mode;