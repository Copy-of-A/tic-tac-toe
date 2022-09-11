export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const cn = (...classNames: Array<string | boolean>) => classNames.filter(Boolean).join(' ')
