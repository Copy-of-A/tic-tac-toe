import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../../App'
import { getRandomNumber } from '../../helper'

const useSinglePlayerModeSetup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<{ name: string; xPlayer: number }>({
    name: '',
    xPlayer: 1,
  })
  const { setGameSetup } = useContext(GameContext)
  const [error, setError] = useState<boolean>(false)

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      name: event.target.value,
    }))
  }

  const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      xPlayer: +(event.target as HTMLInputElement).value,
    }))
  }

  const onStartClick = () => {
    if (!form.name) {
      setError(true)
      return
    }
    setGameSetup({
      gamerFirst: form.name,
      gamerSecond: 'Computer',
      isFirstForX: form.xPlayer === 0 ? getRandomNumber(1, 3) === 1 : form.xPlayer === 1,
      isPvE: true,
    })
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

export default useSinglePlayerModeSetup
