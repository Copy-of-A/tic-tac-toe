import './App.scss'
import Mode from './scenes/Mode/Mode'
import { Route, Routes } from "react-router-dom";
import PvPSetup from './scenes/MultiplayerModeSetup/MultiplayerModeSetup';
import PvESetup from './scenes/SinglePlayerModeSetup/SinglePlayerModeSetup';
import Game from './scenes/Game/Game';
import { useState } from 'react';
import React from 'react';

export interface GameSetup {
  gamerFirst: string | null;
  gamerSecond: string | null;
  isFirstForX: boolean;
  isPvE: boolean;
}

export const GameContext = React.createContext({
  gameSetup: { gamerFirst: null, gamerSecond: null, isFirstForX: true, isPvE: false } as GameSetup,
  setGameSetup: (gameSetup: GameSetup) => {}
});

function App() {

  const [gameSetup, setGameSetup] = useState<GameSetup>({ gamerFirst: null, gamerSecond: null, isFirstForX: true, isPvE: false });
  const value = { gameSetup, setGameSetup };

  return (
    <GameContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Mode />} />
        <Route path="pvp" element={<PvPSetup />} />
        <Route path="pve" element={<PvESetup />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </GameContext.Provider>

  )
}

export default App
