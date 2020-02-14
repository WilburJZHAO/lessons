/**
 * Calculate timer interval based on trial number
 * @param {number} trialNumber
 */
export const calculateTimerInterval = trialNumber => {
  if (trialNumber <= 100) {
    return 50;
  } else if (trialNumber <= 1000) {
    return 10;
  } else if (trialNumber <= 5000) {
    return 5;
  } else if (trialNumber <= 10000) {
    return 0.5;
  } else {
    return 0.1;
  }
};

/**
 * Throw a dice once  i.e. Generate a number randomly from 1, 2, 3, 4, 5, 6
 * @return Number
 */
export const throwDiceOnce = () => {
  return Math.floor(Math.random() * 6) + 1;
};

/**
 * Generate an integer randomly between min(inclusive) and max(inclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number} A random number
 */
export const pickNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Separate number digits by blanks.
 * e.g. 12345678 => 12,345,678
 * @param {number} number
 */
export const separateNumber = number => {
  let strNum = String(number);
  let arrNum = strNum.split("");
  let arr = [];
  let part = "";
  for (let i = 0; i < arrNum.length; i++) {
    let num = arrNum[arrNum.length - i - 1];
    part = num + part;
    if ((i + 1) % 3 === 0) {
      arr.unshift(part);
      part = "";
    }
  }
  if (part.length > 0) {
    arr.unshift(part);
  }
  return arr.join(",");
};
