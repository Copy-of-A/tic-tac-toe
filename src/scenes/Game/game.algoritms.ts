export enum WiningLine {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  MainDiagonal = 'mainDiagonal',
  SecondaryDiagonal = 'secondaruDiagonal',
}

export interface WinningCombination {
  winingLine: WiningLine | null
  lineNumberArray: number[] | null
}

type GetWinnerHelper = (winingLine: WiningLine | null, lineNumberArray: number[] | null) => WinningCombination

const checkHorizontal = (_squares: number[], currentSquare: number, lineLength: number) => {
  const mainRoot = _squares[currentSquare] // item that has been clicked;
  const lineNumber = Math.floor(currentSquare / lineLength)
  const winnerArray = []
  for (let i = 0; i < lineLength; i++) {
    if (_squares[lineNumber * lineLength + i] !== mainRoot) {
      return null
    }
    winnerArray.push(lineNumber * lineLength + i)
  }
  return winnerArray
}

const checkVertical = (_squares: number[], currentSquare: number, lineLength: number) => {
  const mainRoot = _squares[currentSquare] // item that has been clicked;
  const columnNumber = currentSquare % lineLength
  const winnerArray = []
  for (let i = 0; i < lineLength; i++) {
    if (_squares[i * lineLength + columnNumber] !== mainRoot) {
      return null
    }
    winnerArray.push(i * lineLength + columnNumber)
  }
  return winnerArray
}

const checkMainDiagonal = (_squares: number[], currentSquare: number, lineLength: number) => {
  const mainRoot = _squares[currentSquare] // item that has been clicked;
  const winnerArray = []
  for (let i = 0; i < lineLength; i++) {
    if (_squares[i + lineLength * i] !== mainRoot) {
      return null
    }
    winnerArray.push(i + lineLength * i)
  }
  return winnerArray
}

const checkSecondaryDiagonal = (_squares: number[], currentSquare: number, lineLength: number) => {
  const mainRoot = _squares[currentSquare] // item that has been clicked;
  const winnerArray = []
  for (let i = 0; i < lineLength; i++) {
    if (_squares[(i + 1) * lineLength - (i + 1)] !== mainRoot) {
      return null
    }
    winnerArray.push((i + 1) * lineLength - (i + 1))
  }
  return winnerArray
}

export const getFreeSquares = (squares: number[]) => {
  let _freeSquares: number[] = []
  squares.forEach((el, i) => {
    if (el === null) {
      _freeSquares.push(i)
    }
  })
  return _freeSquares
}

export const getWinnerHelper: GetWinnerHelper = (winingLine, lineNumberArray): WinningCombination => {
  return {
    winingLine,
    lineNumberArray,
  }
}

export const getWinner = (_squares: number[], i: number) => {
  const lineLength = Math.sqrt(_squares.length)

  let combination = checkHorizontal(_squares, i, lineLength)
  if (combination) return getWinnerHelper(WiningLine.Horizontal, combination)

  combination = checkVertical(_squares, i, lineLength)
  if (combination) return getWinnerHelper(WiningLine.Vertical, combination)

  combination = checkMainDiagonal(_squares, i, lineLength)
  if (combination) return getWinnerHelper(WiningLine.MainDiagonal, combination)

  combination = checkSecondaryDiagonal(_squares, i, lineLength)
  if (combination) return getWinnerHelper(WiningLine.SecondaryDiagonal, combination)

  return null
}
