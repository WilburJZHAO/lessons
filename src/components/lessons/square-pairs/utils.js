export const initPairsMatch = num => {
  const pairsMatch = [];
  for (let n = 1; n <= num; n++) {
    const pairs = getSquarePair(n, num);
    pairsMatch.push(pairs);
  }
  return pairsMatch;
};

/**
 * Given a number, initialize its square pairs list for display
 * @param {number} num
 * @returns {object} object to represent a game
 * e.g.
 * [ {number: 1, paired: false, pairs: [{number: 3, paired: false}, {number: 8, paired: false}]},
 *   {number: 2, paired: false, pairs: [{number: 7, paired: false }]},
 * ...
 * ]
 */
export const initGame = num => {
  const game = [];
  for (let n = 1; n <= num; n++) {
    const pairs = getSquarePair(n, num);
    game.push({
      number: n,
      paired: false,
      pairs: pairs.map(p => ({ number: p, paired: false }))
    });
  }
  return game;
};

/**
 * Given a number and return an array of its square pairs.
 * e.g. num = 1, max = 16 => [3, 8, 15]
 * @param {number} num the number to find its pairs
 * @param {number} max the maxi of a number's square pair
 */
export const getSquarePair = (num, max) => {
  const pairsArr = [];
  const squareNumbers = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169];
  for (let i = 0; i < squareNumbers.length; i++) {
    const pair = squareNumbers[i] - num;
    if (pair <= max && pair > 0 && pair !== num) {
      pairsArr.push(pair);
    }
  }
  return pairsArr;
};

/**
 * Given a number and calculate all possible pairs
 * e.g. 12 => [[1,3],[1,8],[2,7],[3,6],[4,5],[4,12],[6,10],[7,9]]
 * @param {number} number
 * @returns {array} an array of pairs
 */
export const getAllPairs = number => {
  const pairsArr = [];
  for (let n = 1; n <= number; n++) {
    const pairs = getSquarePair(n, number);
    pairs.forEach(item => {
      if (item > n) {
        pairsArr.push([n, item]);
      }
    });
  }
  return pairsArr;
};
