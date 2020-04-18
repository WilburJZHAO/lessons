import {shuffleArray} from "../../../common/utils.js";

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
 * Given a two-dimensional array and check if there is duplicate number in it
 * Return true if duplicate element is found
 * Otherwise, return false.
 */
export const checkDuplicate = array => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      newArray.push(array[i][j]);
    }
  }

  for (let k = 0; k < newArray.length; k++) {
    let currentElement = newArray[k];
    if (
      typeof currentElement === "number" &&
      newArray.lastIndexOf(currentElement) !== k
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Check if there is duplicate number in any grid of a strategy
 * Return true if duplicate number is found in any grid
 * Otherwise return false
 * @param {Object} strategy
 */
export const checkDuplicateInStrategy = strategy => {
  const { strategyData } = strategy;
  for (let i = 0; i < strategyData.length; i++) {
    if (checkDuplicate(strategyData[i].data)) {
      return true;
    }
  }
  return false;
};

/**
 * Check if the strategy given exists in strategies.
 * Return the index of duplicated strategy if strategy already exists
 * Otherwise return false
 * @param {Object} strategy
 * @param {Array[Object]} strategies
 */
export const checkDuplicateStrategy = (strategy, strategies) => {
  const { strategyData } = strategy;
  const strategyDataList = [];
  for (let i = 0; i < strategies.length; i++) {
    strategyDataList.push(strategies[i].strategyData);
  }

  for (let i = 1; i < strategyDataList.length; i++) {
    let currentStrategyData = strategyDataList[i];
    if (
      isSameArray(currentStrategyData[0].data, strategyData[0].data) &&
      isSameArray(currentStrategyData[1].data, strategyData[1].data) &&
      isSameArray(currentStrategyData[2].data, strategyData[2].data)
    ) {
      return i;
    }
  }
  return false;
};

/**
 * Compare two two-dimensional arrays, array1 and array2.
 * If every element in both arrays is the same, return true.
 * Otherwise, return false.
 * @param {Array} array1
 * @param {Array} array2
 */
export const isSameArray = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * 所有两个0-9之间的数相乘的结果
 */
export const allPossibleMultiplyResults = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  12,
  14,
  15,
  16,
  18,
  20,
  21,
  24,
  25,
  27,
  28,
  30,
  32,
  35,
  36,
  40,
  42,
  45,
  48,
  49,
  54,
  56,
  63,
  64,
  72,
  81
];
/**
 * Check if the gridData can multo.
 * 在一个4*4的二维数组中，至少有一行，或一列或一个对角线上所有的数
 * 都能又两个0-9之间的数相乘来得到。
 */
export const checkCanMulto = gridData => {
  if (!gridData.isChecked) {
    return false;
  }

  const { data } = gridData;
  const dataToCheck = [];
  dataToCheck.push([data[0][0], data[1][1], data[2][2], data[3][3]]);
  dataToCheck.push([data[0][3], data[1][2], data[2][1], data[3][0]]);
  for (let i = 0; i < 3; i++) {
    dataToCheck.push([data[i][0], data[i][1], data[i][2], data[i][3]]);
    dataToCheck.push([data[0][i], data[1][i], data[2][i], data[3][i]]);
  }

  for (let j = 0; j < dataToCheck.length; j++) {
    if (
      allPossibleMultiplyResults.indexOf(dataToCheck[j][0]) >= 0 &&
      allPossibleMultiplyResults.indexOf(dataToCheck[j][1]) >= 0 &&
      allPossibleMultiplyResults.indexOf(dataToCheck[j][2]) >= 0 &&
      allPossibleMultiplyResults.indexOf(dataToCheck[j][3]) >= 0
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Check Multo
 * If multo, return the line in array format, otherwise, return empty array.
 */
export const checkMulto = (gridData, multiplicationList) => {
  // Check two diagonal lines
  if (
    multiplicationList.indexOf(gridData.data[0][0]) !== -1 &&
    multiplicationList.indexOf(gridData.data[1][1]) !== -1 &&
    multiplicationList.indexOf(gridData.data[2][2]) !== -1 &&
    multiplicationList.indexOf(gridData.data[3][3]) !== -1
  ) {
    return [
      gridData.data[0][0],
      gridData.data[1][1],
      gridData.data[2][2],
      gridData.data[3][3]
    ];
  }

  if (
    multiplicationList.indexOf(gridData.data[0][3]) !== -1 &&
    multiplicationList.indexOf(gridData.data[1][2]) !== -1 &&
    multiplicationList.indexOf(gridData.data[2][1]) !== -1 &&
    multiplicationList.indexOf(gridData.data[3][0]) !== -1
  ) {
    return [
      gridData.data[0][3],
      gridData.data[1][2],
      gridData.data[2][1],
      gridData.data[3][0]
    ];
  }

  for (let i = 0; i < 4; i++) {
    if (
      multiplicationList.indexOf(gridData.data[0][i]) !== -1 &&
      multiplicationList.indexOf(gridData.data[1][i]) !== -1 &&
      multiplicationList.indexOf(gridData.data[2][i]) !== -1 &&
      multiplicationList.indexOf(gridData.data[3][i]) !== -1
    ) {
      return [
        gridData.data[0][i],
        gridData.data[1][i],
        gridData.data[2][i],
        gridData.data[3][i]
      ];
    }

    if (
      multiplicationList.indexOf(gridData.data[i][0]) !== -1 &&
      multiplicationList.indexOf(gridData.data[i][1]) !== -1 &&
      multiplicationList.indexOf(gridData.data[i][2]) !== -1 &&
      multiplicationList.indexOf(gridData.data[i][3]) !== -1
    ) {
      return [
        gridData.data[i][0],
        gridData.data[i][1],
        gridData.data[i][2],
        gridData.data[i][3]
      ];
    }
  }

  return [];
};

export const getEachOccur = number => {
  if (
    number === 1 ||
    number === 25 ||
    number === 49 ||
    number === 64 ||
    number === 81
  ) {
    return 1;
  } else if (
    number === 2 ||
    number === 3 ||
    number === 5 ||
    number === 7 ||
    number === 10 ||
    number === 14 ||
    number === 15 ||
    number === 20 ||
    number === 21 ||
    number === 27 ||
    number === 28 ||
    number === 30 ||
    number === 32 ||
    number === 35 ||
    number === 40 ||
    number === 42 ||
    number === 45 ||
    number === 48 ||
    number === 54 ||
    number === 56 ||
    number === 63 ||
    number === 72
  ) {
    return 2;
  } else if (number === 4 || number === 9 || number === 16 || number === 36) {
    return 3;
  } else if (
    number === 6 ||
    number === 8 ||
    number === 12 ||
    number === 18 ||
    number === 24
  ) {
    return 4;
  } else if (number === 0) {
    return 19;
  } else {
    return 0;
  }
};

export const getOccur = number => {
  if (
    number === 1 ||
    number === 25 ||
    number === 49 ||
    number === 64 ||
    number === 81
  ) {
    return getEachOccur(number) * 5;
  } else if (
    number === 2 ||
    number === 3 ||
    number === 5 ||
    number === 7 ||
    number === 10 ||
    number === 14 ||
    number === 15 ||
    number === 20 ||
    number === 21 ||
    number === 27 ||
    number === 28 ||
    number === 30 ||
    number === 32 ||
    number === 35 ||
    number === 40 ||
    number === 42 ||
    number === 45 ||
    number === 48 ||
    number === 54 ||
    number === 56 ||
    number === 63 ||
    number === 72
  ) {
    return getEachOccur(number) * 22;
  } else if (number === 4 || number === 9 || number === 16 || number === 36) {
    return getEachOccur(number) * 4;
  } else if (
    number === 6 ||
    number === 8 ||
    number === 12 ||
    number === 18 ||
    number === 24
  ) {
    return getEachOccur(number) * 5;
  } else if (number === 0) {
    return getEachOccur(number) * 1;
  } else {
    return 0;
  }
};

/**
 * Produce an array of cards [[0, 0]... [9, 9]]
 * shuffled and ready for a game of Multo
 * This aids in avoiding repeating cards during the game
 * @return {Array}
 */
export function newShuffledDeck() {
  let cards = [];
  // make the deck of cards
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      cards.push([i, j]);
    }
  }
  // shuffle and return
  cards = shuffleArray(cards);
  return cards;
}