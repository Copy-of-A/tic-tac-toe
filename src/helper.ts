export const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export function delay(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }