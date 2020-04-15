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
    console.log(i);
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
 * Generate an integer randomly between min(inclusive) and max(inclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number} A random number
 */
export const pickNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Check Addo */
export const checkAddo = (gridData, additionList) => {
  // Check two diagonal lines
  if (
    additionList.indexOf(gridData.data[0][0]) !== -1 &&
    additionList.indexOf(gridData.data[1][1]) !== -1 &&
    additionList.indexOf(gridData.data[2][2]) !== -1
  ) {
    return [gridData.data[0][0], gridData.data[1][1], gridData.data[2][2]];
  }
  if (
    additionList.indexOf(gridData.data[0][2]) !== -1 &&
    additionList.indexOf(gridData.data[1][1]) !== -1 &&
    additionList.indexOf(gridData.data[2][0]) !== -1
  ) {
    return [gridData.data[0][2], gridData.data[1][1], gridData.data[2][0]];
  }

  for (let i = 0; i < 3; i++) {
    if (
      additionList.indexOf(gridData.data[0][i]) !== -1 &&
      additionList.indexOf(gridData.data[1][i]) !== -1 &&
      additionList.indexOf(gridData.data[2][i]) !== -1
    ) {
      return [gridData.data[0][i], gridData.data[1][i], gridData.data[2][i]];
    }

    if (
      additionList.indexOf(gridData.data[i][0]) !== -1 &&
      additionList.indexOf(gridData.data[i][1]) !== -1 &&
      additionList.indexOf(gridData.data[i][2]) !== -1
    ) {
      return [gridData.data[i][0], gridData.data[i][1], gridData.data[i][2]];
    }
  }

  return [];
};

/**
 * Check if the gridData can addo.
 */
export const checkCanAddo = gridData => {
  if (!gridData.isChecked) {
    return false;
  }

  const { data } = gridData;
  const dataToCheck = [];
  dataToCheck.push([data[0][0], data[1][1], data[2][2]]);
  dataToCheck.push([data[0][2], data[1][1], data[2][0]]);
  for (let i = 0; i < 3; i++) {
    dataToCheck.push([data[i][0], data[i][1], data[i][2]]);
    dataToCheck.push([data[0][i], data[1][i], data[2][i]]);
  }

  for (let j = 0; j < dataToCheck.length; j++) {
    if (
      dataToCheck[j][0] !== null &&
      dataToCheck[j][0] >= 0 &&
      dataToCheck[j][0] <= 20 &&
      dataToCheck[j][1] >= 0 &&
      dataToCheck[j][1] <= 20 &&
      dataToCheck[j][2] >= 0 &&
      dataToCheck[j][2] <= 20
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Produce an array of cards [[0, 0]... [10, 10]]
 * shuffled and ready for a game of Addo
 * This aids in avoiding repeating cards during the game
 * @return {Array}
 */
export function newShuffledDeck() {
  let cards = [];
  // make the deck of cards
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
      cards.push([i, j]);
    }
  }
  // shuffle the deck of cards
  for(let i = cards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
}
