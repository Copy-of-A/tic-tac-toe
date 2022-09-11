import React from 'react'
import Board from '../../components/Board/Board'
import useGame from './game.hook'
import { InputLabel, FormControl, Button, Select, MenuItem, Typography } from '@mui/material'
import styles from '../scenes.module.scss'
import gameStyles from './game.module.scss'
import { cn } from '../../helper'

const Game: React.FC = () => {
  const {
    squares,
    status,
    winningCombination,
    newGameHandleClick,
    handleBackToPreviousStep,
    navigate,
    handleClick,
    borderSize,
    handleChangeBorderSize,
    gameHistory,
    gameSetup,
    rating,
  } = useGame()

  return (
    <div className={styles.page}>
      <div className={cn(styles.page, styles.setup)}>
        <FormControl color="secondary" fullWidth>
          <InputLabel color="secondary" id="demo-simple-select-label">
            Board size
          </InputLabel>
          <Select value={borderSize} label="Border size" onChange={handleChangeBorderSize} color="secondary">
            <MenuItem color="secondary" value={3}>
              3 - Three
            </MenuItem>
            <MenuItem color="secondary" value={5}>
              5 - Five
            </MenuItem>
            <MenuItem color="secondary" value={10}>
              10 - Ten
            </MenuItem>
          </Select>
        </FormControl>
        <Typography className={cn(styles.setupGroup, styles.setupGroupMargin)} variant="h5">
          Rating:
        </Typography>
        <Typography className={styles.setupGroup}>
          {gameSetup.gamerFirst} : {rating.firstGamerVictories}
        </Typography>
        <Typography className={styles.setupGroup}>
          {gameSetup.gamerSecond} : {rating.secondGamerVictories}
        </Typography>
        <Typography className={styles.setupGroup}>Draws: : {rating.draws}</Typography>
      </div>
      <div className={styles.page}>
        <h2>{status}</h2>
        <Board squares={squares} winningCombination={winningCombination} onClick={(i) => handleClick(i)} size={+borderSize} />
      </div>
      {!gameSetup.isPvE && (
        <Button
          className={cn(styles.button, gameStyles.marginTop20)}
          variant="contained"
          color="secondary"
          onClick={handleBackToPreviousStep}
          disabled={gameHistory.length < 2}
        >
          Cancel step
        </Button>
      )}
      <div className={styles.buttonContainer}>
        <Button variant="contained" color="secondary" onClick={newGameHandleClick} className={styles.button}>
          new game
        </Button>
        <Button variant="contained" color="secondary" className={styles.button} onClick={() => navigate(-1)}>
          Exit
        </Button>
      </div>
    </div>
  )
}

export default Game
