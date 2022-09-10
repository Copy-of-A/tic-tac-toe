import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Mode: React.FC = () => {
    return (
        <div className="page">
            <h1>Choose how to play:</h1>
            <div className="button-container">
                <Link to={"pvp"}>
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        PvP
                    </Button>
                </Link>
                <Link to={"pve"}>
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        PvE
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Mode;
