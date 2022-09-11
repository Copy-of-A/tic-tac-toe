import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../../App'
import { getRandomNumber } from '../../helper'

interface Form {
  nameFirst: string
  nameSecond: string
  xPlayer: number
}

const useMultiplayerModeSetup = () => {
  const { setGameSetup } = useContext(GameContext)
  const [form, setForm] = useState<Form>({
    nameFirst: '',
    nameSecond: '',
    xPlayer: 1,
  })
  const [error, setErrors] = useState<{ nameFirstError: string | null; nameSecondError: string | null }>({
    nameFirstError: null,
    nameSecondError: null,
  })

  const navigate = useNavigate()

  const handleStartClick = () => {
    if (!validate()) return
    setGameSetup({
      gamerFirst: form.nameFirst,
      gamerSecond: form.nameSecond,
      isFirstForX: form.xPlayer === 0 ? getRandomNumber(1, 3) === 1 : form.xPlayer === 1,
      isPvE: false,
    })
    navigate('/game', { replace: true })
  }

  const handleChangeName1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      nameFirst: event.target.value,
    }))
  }

  const handleChangeName2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      nameSecond: event.target.value,
    }))
  }

  const validate = () => {
    let flag = true
    if (!form.nameFirst) {
      setErrors((errors) => ({
        ...errors,
        nameFirstError: 'Shouldn`t be empty',
      }))
      flag = false
    }
    if (!form.nameSecond) {
      setErrors((errors) => ({
        ...errors,
        nameSecondError: 'Shouldn`t be empty',
      }))
      flag = false
    }
    if (!flag) return flag
    if (form.nameFirst === form.nameSecond) {
      setErrors((errors) => ({
        nameFirstError: 'Shouldn`t be equal',
        nameSecondError: 'Shouldn`t be equal',
      }))
      return false
    }
    return true
  }

  const onBlur = () => {
    setErrors((errors) => ({
      nameFirstError: null,
      nameSecondError: null,
    }))
  }

  const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      xPlayer: +(event.target as HTMLInputElement).value,
    }))
  }

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

export default useMultiplayerModeSetup
