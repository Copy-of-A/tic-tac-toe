import React from 'react'
import useMultiplayerModeSetup from './multiplayerModeSetup.hook'
import { Button, TextField } from '@mui/material'
import ChooseXPlayerRadioGroup from '../../components/ChooseXPlayerRadioGroup/ChooseXPlayerRadioGroup'
import styles from '../scenes.module.scss'
import { cn } from '../../helper'
import { NAME_CHARACTER_LIMIT } from '../../const'

const Mode: React.FC = () => {
  const { error, handleChangeName1, handleChangeName2, onBlur, navigate, form, handleChangeX, onStartClick } = useMultiplayerModeSetup()

  return (
    <div className={styles.page}>
      <div className={cn(styles.page, styles.setup)}>
        <TextField
          label="Player 1"
          variant="outlined"
          helperText={error.nameFirstError || `Enter first player name (${form.nameFirst.length}/${NAME_CHARACTER_LIMIT})`}
          color="secondary"
          onChange={handleChangeName1}
          error={!!error.nameFirstError}
          onBlur={onBlur}
          onFocus={onBlur}
          fullWidth
          inputProps={{
            maxLength: NAME_CHARACTER_LIMIT,
          }}
          className={cn(styles.setupTextField, styles.setupTextFieldBottom)}
        />
        <TextField
          label="Player 2"
          variant="outlined"
          helperText={error.nameSecondError || `Enter second player name (${form.nameSecond.length}/${NAME_CHARACTER_LIMIT})`}
          color="secondary"
          onChange={handleChangeName2}
          error={!!error.nameSecondError}
          onBlur={onBlur}
          onFocus={onBlur}
          fullWidth
          className={styles.setupTextField}
        />
        <ChooseXPlayerRadioGroup
          value={form.xPlayer.toString()}
          handleChange={handleChangeX}
          labels={['First player', 'Second player', 'Choose at random']}
          className={cn(styles.setupGroup, styles.setupGroupMargin)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => navigate(-1)} variant="contained" color="secondary" className={styles.button}>
          Back
        </Button>
        <Button onClick={onStartClick} variant="contained" color="secondary" className={styles.button}>
          Play
        </Button>
      </div>
    </div>
  )
}

export default Mode
