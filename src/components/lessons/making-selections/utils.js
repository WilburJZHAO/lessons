import { pickNumber } from "../../common/utils";

/**
 * Convert a number to its corresponding card rank.
 * @param {number} num
 */
export const convertNumberToCard = (num) => {
  let card;
  switch (num) {
    case 1:
      card = "Ace";
      break;
    case 11:
      card = "J";
      break;
    case 12:
      card = "Q";
      break;
    case 13:
      card = "K";
      break;
    default:
      card = num;
  }
  return card;
};

/**
 * Draw n cards randomly from total cards
 * @param {number} n
 * @param {number} total
 * @returns {Array} an array that has the number drawn
 */
export const drawCards = (n, total) => {
  const totalArr = [];
  let drawnArr = [];
  for (let i = 1; i <= total; i++) {
    totalArr.push(i);
  }
  for (let i = 1; i <= n; i++) {
    const drawnIndex = pickNumber(0, totalArr.length - 1);
    drawnArr.push(totalArr[drawnIndex]);
    totalArr.splice(drawnIndex, 1);
  }
  return drawnArr;
};

/**
 * Check a game result
 * @param {Array} cards
 * @param {Array} winningCards
 * @param {boolean} allToWin
 * @returns {number} 1 - win, 0 - lose
 */
export const checkResult = (cards, winningCards, allToWin = false) => {
  // console.log(cards, winningCards);
  if (allToWin) {
    // console.log("allTowin");
    for (let i = 0; i < winningCards.length; i++) {
      if (cards.indexOf(winningCards[i]) === -1) {
        return 0;
      }
    }
    return 1;
  }

  if (!allToWin) {
    for (let i = 0; i < winningCards.length; i++) {
      if (cards.indexOf(winningCards[i]) !== -1) {
        return 1;
      }
    }
    return 0;
  }
};
