import { pickNumber } from "../../common/utils";

/** Pick a card of number from 1(A) to 6, that is not used
 * (does not exist in usedNumbers)
 * Return an object with suit and number
 */
export const drawCard = (usedNumbers = []) => {
  const suits = ["C", "D", "H", "S"];
  const suitIndex = pickNumber(0, 3);
  let number;
  do {
    number = pickNumber(1, 6);
  } while (usedNumbers.indexOf(number) >= 0);
  return {
    suit: suits[suitIndex],
    number
  };
};

/** The key 1 - 6 is the number of card drawn
 * The value means which position the card will be placed
 * 0 means the card will be placed on ten part
 * 1 means the card will be placed on one part
 */
export const computerStrategyForTwoDigits = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 0,
  6: 0
};

/** The key is the number of card(s) drawn
 * The value is the position the card will be placed
 * 0 means the card will be placed on hundred part
 * 1 means the card will be placed on ten part
 * 2 means the card will be placed on one part
 */
export const computerStrategyForThreeDigits = {
  1: 2, // If the first card drawn is 1(A), the card should be placed on one part
  12: 1, // If the first card drawn is 1(A) and the second card drawn is 2, the card(2) should be placed on ten part
  13: 1,
  14: 1,
  15: 0, // 0 means it can be placed the card should be placed on hundred
  16: 0,
  2: 2,
  21: 1,
  23: 1,
  24: 1,
  25: 0,
  26: 0,
  3: 1,
  31: 2,
  32: 2,
  34: 2,
  35: 0,
  36: 0,
  4: 1,
  41: 2,
  42: 2,
  43: 2,
  45: 0,
  46: 0,
  5: 0,
  51: 2,
  52: 2,
  53: 1,
  54: 1,
  56: 1,
  6: 0,
  61: 2,
  62: 2,
  63: 1,
  64: 1,
  65: 1
};

export const randomStrategy = {
  1: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  2: null,
  21: null,
  23: null,
  24: null,
  25: null,
  26: null,
  3: null,
  31: null,
  32: null,
  34: null,
  35: null,
  36: null,
  4: null,
  41: null,
  42: null,
  43: null,
  45: null,
  46: null,
  5: null,
  51: null,
  52: null,
  53: null,
  54: null,
  56: null,
  6: null,
  61: null,
  62: null,
  63: null,
  64: null,
  65: null
};
