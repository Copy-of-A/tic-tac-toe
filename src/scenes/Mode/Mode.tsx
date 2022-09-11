import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import styles from '../scenes.module.scss'
import modeStyles from './mode.module.scss'

const Mode: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={modeStyles.h1}>Choose how to play:</h1>
      <div className={styles.buttonContainer}>
        <Link to={'/pvp'}>
          <Button variant="contained" color="secondary" className={styles.button}>
            PvP
          </Button>
        </Link>
        <Link to={'/pve'}>
          <Button variant="contained" color="secondary" className={styles.button}>
            PvE
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Mode
