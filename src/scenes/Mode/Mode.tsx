import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Mode: React.FC = () => {
    return (
        <div>
            <h1>Choose how to play:</h1>
            <div className="flex-jstf">
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
