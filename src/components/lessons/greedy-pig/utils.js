export const initGame = [
  {
    id: 1,
    dices: [],
    score: 0
  },
  {
    id: 2,
    dices: [],
    score: 0
  },
  { id: 3, dices: [], score: 0 },
  { id: 4, dices: [], score: 0 },
  { id: 5, dices: [], score: 0 }
];

/**
 * Play one game and return the points you get
 * @param {Object} strategy
 * @param {number} killDice
 */
import { pickNumber } from "../../common/utils";
export const playOneGame = (strategy, killerDice) => {
  const { type, value } = strategy;
  if (type === "rolls") {
    let total = 0; // total points for one complete game
    let points = 0; // points for one set
    let rolls = 1; // rolls for one set
    for (let i = 1; i <= 5; i++) {
      // Play five times
      points = 0;
      rolls = 1;
      let dice = 0;
      points += pickNumber(1, 6) + pickNumber(1, 6); // The first roll
      while (rolls < value && dice != killerDice) {
        dice = pickNumber(1, 6);
        rolls++;
        if (dice === killerDice) {
          points = 0;
        } else {
          points += dice;
        }
      }
      total += points;
      // console.log(total);
    }
    return total;
  }

  if (type === "points") {
    let total = 0; // total points for one complete game
    let points = 0; // points for one set
    let rolls = 1; // rolls for one set
    for (let i = 1; i <= 5; i++) {
      // Play five times
      points = 0;
      rolls = 1;
      points += pickNumber(1, 6) + pickNumber(1, 6); // The first roll
      let dice = 0;
      while (points < value && dice != killerDice) {
        dice = pickNumber(1, 6);
        rolls++;
        if (dice === killerDice) {
          points = 0;
        } else {
          points += dice;
        }
      }
      total += points;
    }
    return total;
  }
  return 0;
};

/**
 *  Given an array of number(sorted), get the median of the dataset
 */
export const getMedian = sortedArr => {
  if (sortedArr.length === 0) return null;
  // const sortedArr = arr.sort((a, b) => a - b); // Sorting array
  if (sortedArr.length % 2 === 0) {
    return (
      (sortedArr[sortedArr.length / 2] + sortedArr[sortedArr.length / 2 - 1]) /
      2
    );
  } else {
    return sortedArr[(sortedArr.length - 1) / 2];
  }
};
