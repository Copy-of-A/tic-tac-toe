import './App.css'
import Mode from './components/Mode/Mode'
import { Route, Routes } from "react-router-dom";
import PvPSetup from './components/Mode/components/MultiplayerModeSetup/MultiplayerModeSetup';
import PvESetup from './components/Mode/components/SinglePlayerModeSetup/SinglePlayerModeSetup';
import Game from './components/Game/Game';
import { useState } from 'react';
import React from 'react';

export interface GameSetup {
  gamerFirst: string | null;
  gamerSecond: string | null;
  isFirstForX: boolean;
  isPvP: boolean;
}

export const GameContext = React.createContext({
  gameSetup: { gamerFirst: null, gamerSecond: null, isFirstForX: true, isPvP: true } as GameSetup,
  setGameSetup: (gameSetup: GameSetup) => {}
});

function App() {

  const [gameSetup, setGameSetup] = useState<GameSetup>({ gamerFirst: null, gamerSecond: null, isFirstForX: true, isPvP: true });
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
