import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../../App";

const useSinglePlayerModeSetup = () => {
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
        if (!form.name) {
            setError(true);
            return;
        }
        setGameSetup({
            gamerFirst: form.name,
            gamerSecond: "computer",
            isFirstForX: form.isX,
            isPvP: false,
        });
        navigate('/game', { replace: true })
    }
    return {
        error,
        setError,
        handleChangeName,
        navigate,
        form,
        handleChangeX,
        onStartClick,
    }
}

export default useSinglePlayerModeSetup;