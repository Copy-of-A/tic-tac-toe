import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../App";

const useMultiplayerModeSetup = () => {
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

    const handleStartClick = () => {
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
    return {
        error,
        handleChangeName1,
        handleChangeName2,
        onBlur,
        navigate,
        form,
        handleChangeX,
        onStartClick: handleStartClick,
    }
}

export default useMultiplayerModeSetup;